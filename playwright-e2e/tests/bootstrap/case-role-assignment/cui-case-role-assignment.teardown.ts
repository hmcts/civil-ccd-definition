import { test as teardown } from '../../../playwright-fixtures/index';
import { claimants, defendants } from '../../../config/users/cui-users';
import config from '../../../config/config';

if (config.unassignCases) {
  teardown.describe('Unassigning case roles for cui users', () => {
    teardown.describe.configure({ mode: 'parallel' });

    for (let workerIndex = 0; workerIndex < config.playwright.workers; workerIndex++) {
      teardown(`Worker ${workerIndex + 1}: Claimant`, async ({ CaseRoleAssignmentApiSteps }) => {
        await CaseRoleAssignmentApiSteps.UnassignCases(claimants[workerIndex]);
      });

      teardown(`Worker ${workerIndex + 1}: Defendant`, async ({ CaseRoleAssignmentApiSteps }) => {
        await CaseRoleAssignmentApiSteps.UnassignCases(defendants[workerIndex]);
      });
    }
  });
} else {
  console.log('Skipping case role unassignment for cui users');
}
