import { test as setup } from '../../../playwright-fixtures/index';
import { exuiUserDataSetupUsers } from '../../../config/users/exui-users';

setup.describe('Authenticating exui user(s) and saving cookies', () => {
  setup.describe.configure({ mode: 'parallel' });

  exuiUserDataSetupUsers.forEach((exuiAuthSetupUser) => {
    setup(exuiAuthSetupUser.name, async ({ ApiUsersSteps }) => {
      await ApiUsersSteps.SetupUserData(exuiAuthSetupUser);
    });
  });
});
