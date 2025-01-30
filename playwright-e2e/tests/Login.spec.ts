import { civilAdminUser } from '../config/users/exui-users';
import ccdEvents from '../constants/ccd-events';
import { test } from '../playwright-fixtures/index';

test('Testing Login', async ({
  IdamSteps,
  NotifyClaimSteps,
  NotifyClaimDetailsSteps,
  ExuiDashboardSteps,
  DefendantResponseSteps,
}) => {
  // await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  /*await IdamSteps.DefendantSolicitor1Login();
  await DefendantResponseSteps.RespondToDefence1v1();*/
  await IdamSteps.ClaimantSolicitorLogin();
  //await NotifyClaimSteps.NotifyClaim1v1();
  await NotifyClaimDetailsSteps.NotifyClaimDetails1v1();
});
