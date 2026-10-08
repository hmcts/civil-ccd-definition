import fs from 'fs';
import path from 'path';
import {
  civilServiceUrl,
  claimantSolicitorCredentials,
  respondent1SolicitorCredentials,
  respondent2SolicitorCredentials,
} from '../civilConfig.ts';

// Users that can be assigned to a case during a test. Only the key is written to disk, never credentials.
export const caseUsers = {
  claimantSolicitor: claimantSolicitorCredentials,
  respondent1Solicitor: respondent1SolicitorCredentials,
  respondent2Solicitor: respondent2SolicitorCredentials,
};

export type CaseUserKey = keyof typeof caseUsers;

export type CaseUserRecord = {
  caseId: string;
  userKey: CaseUserKey;
  civilServiceUrl: string;
  recordedAt: string;
};

type StoredRecord = CaseUserRecord & { file: string };

const registryDir = path.resolve('./dr-playwright/e2e/.cases');
const caseIdPattern = /^\d{16}$/;

// Set once in playwright.config.ts by the runner process and inherited by every worker, so all workers
// in one run share a folder and the teardown never touches cases belonging to another run still in progress.
const runId = process.env.DR_PLAYWRIGHT_RUN_ID ?? `${process.ppid}-adhoc`;
const runDir = path.join(registryDir, runId);

// Records which users are assigned to which cases so the teardown can unassign them.
//  - Each case/user pair has its own file, so workers never write to the same file.
//  - Files are written to a temp name and renamed into place, so a reader never sees an empty or partial file.
//  - Anything without a valid case number is skipped, so the unassign endpoint is never called without one.
export class CaseUserRegistry {
  static isValidCaseId(caseId: string | undefined): caseId is string {
    return typeof caseId === 'string' && caseIdPattern.test(caseId);
  }

  static record(caseId: string, userKey: CaseUserKey) {
    if (!this.isValidCaseId(caseId)) {
      console.warn(`Not recording ${userKey} for unassignment: "${caseId}" is not a valid case number`);
      return;
    }
    fs.mkdirSync(runDir, { recursive: true });
    const entry: CaseUserRecord = { caseId, userKey, civilServiceUrl, recordedAt: new Date().toISOString() };
    const file = path.join(runDir, `${caseId}-${userKey}.json`);
    const tempFile = `${file}.${process.pid}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(entry, null, 2));
    fs.renameSync(tempFile, file);
    console.log(`Recorded ${userKey} on case ${caseId} for unassignment at teardown`);
  }

  // Returns valid records for this run, plus any left behind by earlier runs that have since ended.
  // Only records for the environment being run against are returned.
  static readAll(): StoredRecord[] {
    return this.runDirsToProcess().flatMap((dir) =>
      fs
        .readdirSync(dir)
        .filter((file) => file.endsWith('.json'))
        .map((file) => this.readRecord(path.join(dir, file)))
        .filter((entry): entry is StoredRecord => entry !== null && entry.civilServiceUrl === civilServiceUrl),
    );
  }

  static remove({ file }: StoredRecord) {
    fs.rmSync(file, { force: true });
    const dir = path.dirname(file);
    if (fs.existsSync(dir) && fs.readdirSync(dir).length === 0) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }

  private static readRecord(file: string): StoredRecord | null {
    try {
      const content = fs.readFileSync(file, 'utf8').trim();
      if (!content) {
        console.warn(`Skipping empty case record ${file}`);
        return null;
      }
      const entry = JSON.parse(content) as Partial<CaseUserRecord>;
      if (!this.isValidCaseId(entry.caseId) || !entry.userKey || !(entry.userKey in caseUsers)) {
        console.warn(`Skipping case record ${file}: missing a valid case number or user`);
        return null;
      }
      return { ...(entry as CaseUserRecord), file };
    } catch (error) {
      // The file may have been removed by another teardown, or be unreadable; either way there is nothing to unassign
      console.warn(`Skipping unreadable case record ${file}: ${error instanceof Error ? error.message : error}`);
      return null;
    }
  }

  private static runDirsToProcess(): string[] {
    if (!fs.existsSync(registryDir)) {
      return [];
    }
    return fs
      .readdirSync(registryDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .filter((entry) => entry.name === runId || !this.isRunInProgress(entry.name))
      .map((entry) => path.join(registryDir, entry.name));
  }

  // Run folders are named "<runner pid>-<start time>"; a run is still in progress while its runner process exists
  private static isRunInProgress(runFolder: string): boolean {
    const pid = Number(runFolder.split('-')[0]);
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
}
