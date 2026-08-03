import config from '../../../config/config';
import { claimants, defendants } from '../../../config/users/cui-users';
import { test as teardown } from '../../../playwright-fixtures/index';

if (config.runCuiUserSetup) {
  teardown.describe(`Deleting citizen users for ${config.playwright.workers} worker(s)`, () => {
    teardown.describe.configure({ mode: 'parallel' });

    teardown('Claimant(s)', async ({ IdamApiSteps }) => {
      await IdamApiSteps.DeleteCuiUsers(claimants);
    });
    teardown('Defendant(s)', async ({ IdamApiSteps }) => {
      await IdamApiSteps.DeleteCuiUsers(defendants);
    });
  });
}
