import crypto from 'crypto';
import fs from 'fs';
import os from 'os';
import path from 'path';
import lockfile from 'proper-lockfile';

/**
 * Serialises a block of work across Playwright workers, which are separate processes on the
 * same machine. Use it around a shared external resource that tests reconfigure, such as a
 * global WireMock stub, so that parallel tests don't overwrite each other's set-up.
 *
 * The lock is a directory under the OS temp dir, keyed on the lock name and the resource it
 * guards, so builds on the same agent that use different resources don't wait for each other.
 * proper-lockfile refreshes the lock while it is held and treats it as stale once the holder
 * stops refreshing it, so a worker that dies doesn't block the rest of the run.
 */
export default class CrossWorkerLockHelper {
  private static lockDir = path.join(os.tmpdir(), 'civil-playwright-locks');

  private static WAIT_TIMEOUT_MS = 15 * 60 * 1000;

  private static RETRY_INTERVAL_MS = 1000;

  static async withLock<T>(name: string, resource: string, fn: () => Promise<T>): Promise<T> {
    fs.mkdirSync(this.lockDir, { recursive: true });
    const resourceHash = crypto.createHash('sha1').update(resource).digest('hex').slice(0, 12);
    const lockPath = path.join(this.lockDir, `${name}-${resourceHash}`);

    const waitStart = Date.now();
    const release = await lockfile.lock(lockPath, {
      realpath: false,
      stale: 30_000,
      retries: {
        retries: Math.ceil(this.WAIT_TIMEOUT_MS / this.RETRY_INTERVAL_MS),
        factor: 1,
        minTimeout: this.RETRY_INTERVAL_MS,
        maxTimeout: this.RETRY_INTERVAL_MS,
      },
    });
    const waitedSeconds = Math.round((Date.now() - waitStart) / 1000);
    console.log(`Acquired lock: ${name}${waitedSeconds ? ` after waiting ${waitedSeconds}s` : ''}`);

    try {
      return await fn();
    } finally {
      await release();
    }
  }
}
