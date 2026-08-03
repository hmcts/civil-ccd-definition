import { test as setup } from '../../../playwright-fixtures/index';
import { exuiUserDataSetupUsers } from '../../../config/users/exui-users';
import config from '../../../config/config';

if (config.runExuiUserDataSetup) {
  setup.describe('Setting up exui user data', () => {
    setup.describe.configure({ mode: 'parallel' });

    exuiUserDataSetupUsers.forEach((exuiAuthSetupUser) => {
      setup(exuiAuthSetupUser.name, async ({ IdamApiSteps }) => {
        await IdamApiSteps.SetupUserData(exuiAuthSetupUser);
      });
    });
  });
} else {
  console.log('Skipping setting up exui user data');
  console.log('All exui users will get user data when needed during test execution');
}
