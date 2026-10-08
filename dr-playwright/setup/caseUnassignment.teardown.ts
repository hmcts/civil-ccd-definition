  import { test as teardown } from '@playwright/test';
import { CaseUserRegistry, CaseUserKey, caseUsers } from '../helpers/CaseUserRegistry.ts';
import { TestingEndPointHelper } from '../helpers/TestingEndPointHelper.ts';
import { caseUnassignment } from '../civilConfig.ts';

function toBatches<T>(items: T[], batchSize: number): T[][] {
  const batches: T[][] = [];
  for (let start = 0; start < items.length; start += batchSize) {
    batches.push(items.slice(start, start + batchSize));
  }
  return batches;
}

// Runs once after every worker in the run has finished. Records that fail to unassign are kept, so a later run retries them.
teardown('Unassign users from cases created during the run', async () => {
  const records = CaseUserRegistry.readAll();
  if (records.length === 0) {
    console.log('No case assignments recorded. Nothing to unassign.');
    return;
  }

  const recordsByUser = new Map<CaseUserKey, typeof records>();
  for (const record of records) {
    recordsByUser.set(record.userKey, [...(recordsByUser.get(record.userKey) ?? []), record]);
  }

  // Cases are unassigned in batches, one batch after another, so the case IDs fit in civil-service's request URL.
  // Each batch's records are removed as soon as it succeeds, so a failed batch only leaves its own cases to retry.
  const failures: string[] = [];
  for (const [userKey, userRecords] of recordsByUser) {
    const caseIds = [...new Set(userRecords.map(({ caseId }) => caseId))].filter((caseId) => CaseUserRegistry.isValidCaseId(caseId));
    if (caseIds.length === 0) {
      continue;
    }
    const batches = toBatches(caseIds, caseUnassignment.batchSize);
    console.log(`Unassigning ${caseUsers[userKey].name} from ${caseIds.length} case(s) in ${batches.length} batch(es) of up to ${caseUnassignment.batchSize}`);

    // One helper per user, so the user's tokens are fetched once and reused for every batch
    const testingEndPointHelper = new TestingEndPointHelper();
    for (const batch of batches) {
      try {
        await testingEndPointHelper.unassignUserFromCases(caseUsers[userKey], batch);
        userRecords
          .filter((record) => batch.includes(record.caseId))
          .forEach((record) => CaseUserRegistry.remove(record));
      } catch (error) {
        failures.push(error instanceof Error ? error.message : String(error));
      }
    }
  }

  if (failures.length > 0) {
    throw new Error(`Some users could not be unassigned and will be retried next run:\n${failures.join('\n\n')}`);
  }
});
