import fs from 'fs';
import path from 'path';

// GOV.UK Pay's sandbox can turn down card payments made at the same moment: with 7 or 8 scenarios paying the claim fee
// together on a PR's preview, about one went through and the rest showed "Your card payment was unsuccessful", while
// a payment on its own always went through. So only one worker pays by card at a time. The others wait for the lock,
// which a card payment holds for about half a minute (GOV.UK Pay's pages and the result).
//
// The lock is a file created with the "wx" flag, which fails if the file already exists, so only one worker can
// create it. It holds the pid of the worker that has it. It is shared by every run in this checkout, so runs started
// side by side (a specified and an unspecified journey in two terminals) also take turns.
const lockDir = path.resolve('./playwright-tests/e2e/.locks');
const lockFile = path.join(lockDir, 'card-payment.lock');
// A lock older than this is from a worker that stopped without releasing it, as a card payment takes well under it
const staleAfterMs = 5 * 60 * 1000;
const pollMs = 1000;

type LockHolder = { pid: number };

// Whether the lock's holder has stopped without releasing it: its process has gone, or the lock is older than any
// card payment takes. A lock that cannot be read yet (just created, before its pid is written) is not stale.
function isStale(): boolean {
  let stat: fs.Stats;
  try {
    stat = fs.statSync(lockFile);
  } catch {
    return false;
  }
  if (Date.now() - stat.mtimeMs > staleAfterMs) {
    return true;
  }
  try {
    const holder = JSON.parse(fs.readFileSync(lockFile, 'utf8')) as LockHolder;
    process.kill(holder.pid, 0);
    return false;
  } catch (error) {
    // ESRCH: no process with that pid. Anything else (unreadable or half-written file, or EPERM for a process of
    // another user) is treated as a holder still at work.
    return (error as NodeJS.ErrnoException).code === 'ESRCH';
  }
}

function tryToTake(): boolean {
  try {
    const fd = fs.openSync(lockFile, 'wx');
    fs.writeSync(fd, JSON.stringify({ pid: process.pid } satisfies LockHolder));
    fs.closeSync(fd);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'EEXIST') {
      return false;
    }
    throw error;
  }
}

function release() {
  try {
    const holder = JSON.parse(fs.readFileSync(lockFile, 'utf8')) as LockHolder;
    if (holder.pid === process.pid) {
      fs.unlinkSync(lockFile);
    }
  } catch {
    // Already gone, for example removed as stale after this worker took too long
  }
}

// Runs a card payment once no other worker is paying by card, and releases the lock when it is done, whether it
// passed or failed
export async function withCardPaymentLock<T>(payment: () => Promise<T>): Promise<T> {
  fs.mkdirSync(lockDir, { recursive: true });
  const waitStart = Date.now();
  let waiting = false;
  while (!tryToTake()) {
    if (isStale()) {
      console.log('Removing a card payment lock left by a worker that stopped without releasing it');
      try {
        fs.unlinkSync(lockFile);
      } catch {
        // Another worker removed it first
      }
      continue;
    }
    if (!waiting) {
      console.log('Waiting for another worker\'s card payment to finish (GOV.UK Pay turns down card payments made at the same time)');
      waiting = true;
    }
    await new Promise((resolve) => setTimeout(resolve, pollMs));
  }
  if (waiting) {
    console.log(`Card payment started after waiting ${Math.round((Date.now() - waitStart) / 1000)}s for another worker's`);
  }
  try {
    return await payment();
  } finally {
    release();
  }
}
