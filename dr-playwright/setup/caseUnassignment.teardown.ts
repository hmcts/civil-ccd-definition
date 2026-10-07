  import { test as teardown } from '@playwright/test';
import { CaseUserRegistry, CaseUserKey, caseUsers } from '../helpers/CaseUserRegistry.ts';
import { TestingEndPointHelper } from '../helpers/TestingEndPointHelper.ts';

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

  const failures: string[] = [];
  for (const [userKey, userRecords] of recordsByUser) {
    const caseIds = [...new Set(userRecords.map(({ caseId }) => caseId))].filter((caseId) => CaseUserRegistry.isValidCaseId(caseId));
    if (caseIds.length === 0) continue;
    try {
      await new TestingEndPointHelper().unassignUserFromCases(caseUsers[userKey], caseIds);
      userRecords.forEach((record) => CaseUserRegistry.remove(record));
    } catch (error) {
      failures.push(error instanceof Error ? error.message : String(error));
    }
  }

  if (failures.length > 0) {
    throw new Error(`Some users could not be unassigned and will be retried next run:\n${failures.join('\n\n')}`);
  }
});
