import config from '../../../config/config';
import { claimants, defendants } from '../../../config/users/cui-users';
import { test as setup } from '../../../playwright-fixtures/index';

if (config.runCuiUserDataSetup) {
  setup.describe('Setting up cui user data', () => {
    setup('Claimant(s)', async ({ IdamApiSteps }) => {
      await IdamApiSteps.SetupUsersData(claimants);
    });
    setup('Defendant(s)', async ({ IdamApiSteps }) => {
      await IdamApiSteps.SetupUsersData(defendants);
    });
  });
} else {
  console.log('Skipping setting up cui user data');
  console.log('All cui users will get user data when needed during test execution');
}
