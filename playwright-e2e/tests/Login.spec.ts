import { claimantSolicitorUser } from '../config/users/exui-users';
import { test } from '../playwright-fixtures/index';

test(
  'Testing Login',
  { tag: '@debug' },
  async ({ IdamSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, NotifyClaimSteps }) => {
    await ApiUserSteps.SetupUserData(claimantSolicitorUser);
    await ApiDataSteps.SetupBankHolidaysData();
    await IdamSteps.ClaimantSolicitorLogin();

    await NotifyClaimSteps.NotifyClaim1v1LIP();
  },
);
