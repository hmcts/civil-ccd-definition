import config from '../../../config/config';
import { claimants, defendants } from '../../../config/users/cui-users';
import { test as setup } from '../../../playwright-fixtures/index';

if (config.runCuiUserSetup) {
  setup.describe(`Creating citizen users for ${config.playwright.workers} worker(s)`, () => {
    setup.describe.configure({ mode: 'parallel' });
    setup('Claimant(s)', async ({ IdamApiSteps }) => {
      await IdamApiSteps.CreateCuiUsers(claimants);
    });
    setup('Defendant(s)', async ({ IdamApiSteps }) => {
      await IdamApiSteps.CreateCuiUsers(defendants);
    });
  });
} else {
  console.log('Skipping creation of claimant and defendant users');
}
