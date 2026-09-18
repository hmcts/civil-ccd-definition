import { test as setup } from '../../../playwright-fixtures/index';
import { exuiUserDataSetupUsers } from '../../../config/users/exui-users';
import config from '../../../config/config';

if (config.runExuiUserDataSetup) {
  setup.describe('Setting up exui user data', () => {
    setup.describe.configure({ mode: 'parallel' });

    exuiUserDataSetupUsers.forEach((exuiAuthSetupUser) => {
      setup(exuiAuthSetupUser.name, async ({ IdamApiSteps }) => {
        if(process.env.RUN_FAILING_SETUP_TESTS === 'true') {
          throw new Error('This test is currently failing and is being skipped. Please check the test and fix it before enabling it again.');
        }
        await IdamApiSteps.SetupUserData(exuiAuthSetupUser);
      });
    });
  });
} else {
  console.log('Skipping setting up exui user data');
  console.log('All exui users will get user data when needed during test execution');
}
