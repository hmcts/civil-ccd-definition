import { test as setup } from '../../../playwright-fixtures/index';
import { exuiAuthSetupUsers } from '../../../config/users/exui-users';

setup.describe('Authenticating exui user(s) and saving cookies', () => {
  setup.describe.configure({ mode: 'parallel' });

  exuiAuthSetupUsers.forEach((exuiAuthSetupUser, index) => {
    if (index > 0) {
      setup(exuiAuthSetupUser.name, { tag: '@verify-cookies-banner' }, async ({ IdamSteps, ExuiDashboardSteps }) => {
        await IdamSteps.ExuiLogin(exuiAuthSetupUser);
        await ExuiDashboardSteps.AcceptCookies();
        await ExuiDashboardSteps.SaveCookies(exuiAuthSetupUser);
      });
    } else
      setup(exuiAuthSetupUser.name, async ({ IdamSteps, ExuiDashboardSteps }) => {
        await IdamSteps.ExuiLogin(exuiAuthSetupUser);
        await ExuiDashboardSteps.SaveCookies(exuiAuthSetupUser);
      });
  });
});
