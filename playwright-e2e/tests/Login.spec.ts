import { test } from '../playwright-fixtures/index';

test.skip('Testing Login', async ({ IdamSteps, ExuiDashboardSteps }) => {
  await IdamSteps.ClaimantSolicitorLogin();
  await ExuiDashboardSteps.GoToCaseList();
  await IdamSteps.DefendantSolicitor1Login();
  await ExuiDashboardSteps.GoToCaseList();
  await IdamSteps.DefendantSolicitor2Login();
  await ExuiDashboardSteps.GoToCaseList();
});
