import fs from 'node:fs';
import path from 'node:path';

// Each run has an ID, "<runner pid>-<start time>", set once in playwright.config.ts (PLAYWRIGHT_RUN_ID) and inherited
// by every worker, so everything one run writes can be kept apart from other runs going at the same time.
const runIdPattern = /^(\d+)-(\d+)$/;

// A run is still in progress while its runner process exists
export function isRunInProgress(runId: string): boolean {
  const pid = Number(runId.split('-')[0]);
  if (!Number.isInteger(pid) || pid <= 0) {
    return false;
  }
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error as NodeJS.ErrnoException).code === 'EPERM';
  }
}

// Deletes the results folders (traces, videos, screenshots) of finished runs under resultsRoot, keeping the newest
// `keep` of them. Folders of runs still in progress, and anything not named after a run, are never touched.
export function pruneOldRunResults(resultsRoot: string, keep: number) {
  if (!fs.existsSync(resultsRoot)) {
    return;
  }
  const finishedRuns = fs
    .readdirSync(resultsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && runIdPattern.test(entry.name) && !isRunInProgress(entry.name))
    .map((entry) => ({ name: entry.name, startedAt: Number(entry.name.match(runIdPattern)![2]) }))
    .sort((a, b) => b.startedAt - a.startedAt);
  for (const run of finishedRuns.slice(keep)) {
    fs.rmSync(path.join(resultsRoot, run.name), { recursive: true, force: true });
  }
}
