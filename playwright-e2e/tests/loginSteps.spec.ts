import { civilAdminUser } from '../config/users/exui-users';
import { test } from '../playwright-fixtures/index';

test('Testing 1v1 Unspec small Claim ', async ({
  IdamSteps,
  ApiUserSteps,
  ApiDataSteps,
  _requestsFactory,
  _exuiDashboardPageFactory,
  ClaimantResponseSteps,
}) => {
  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSteps.SmallClaim1v1();
});

test('Testing 1v2 Same Solicitor Unspec small Claim ', async ({
  IdamSteps,
  ApiUserSteps,
  ApiDataSteps,
  _requestsFactory,
  _exuiDashboardPageFactory,
  ClaimantResponseSteps,
}) => {
  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSteps.SmallClaim1v2SS();
});

test('Testing 1v2 Different Solicitor Unspec small Claim ', async ({
  IdamSteps,
  ApiUserSteps,
  ApiDataSteps,
  _requestsFactory,
  _exuiDashboardPageFactory,
  ClaimantResponseSteps,
}) => {
  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSteps.SmallClaim1v2DS();
});

test('Testing 2v1 Unspec small Claim ', async ({
  IdamSteps,
  ApiUserSteps,
  ApiDataSteps,
  _requestsFactory,
  _exuiDashboardPageFactory,
  ClaimantResponseSteps,
}) => {
  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSteps.SmallClaim2v1();
});

test('Testing 1v1 Unspec Fast Claim', async ({
  IdamSteps,
  ApiUserSteps,
  ApiDataSteps,
  _requestsFactory,
  _exuiDashboardPageFactory,
  ClaimantResponseSteps,
}) => {
  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSteps.FastTrack1v1();
});

test('Testing 1v1 Spec Small Claim', async ({
  IdamSteps,
  ApiUserSteps,
  ApiDataSteps,
  _requestsFactory,
  _exuiDashboardPageFactory,
  ClaimantResponseSpecSteps,
}) => {
  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSpecSteps.SmallTrack1v1();
});

test('Testing 1v1 Spec Fast Track', async ({
  IdamSteps,
  ApiUserSteps,
  ApiDataSteps,
  _requestsFactory,
  _exuiDashboardPageFactory,
  ClaimantResponseSpecSteps,
}) => {
  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSpecSteps.FastTrack1v1();
});

test('Testing 1v2 Same Solicitor Small Claim', async ({
  IdamSteps,
  ApiUserSteps,
  ApiDataSteps,
  _requestsFactory,
  _exuiDashboardPageFactory,
  ClaimantResponseSpecSteps,
}) => {
  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSpecSteps.SmallTrack1v2SS();
});

test(
  'Testing 1v2 Different Solicitor Small Claim',
  { tag: '@debug' },
  async ({
    IdamSteps,
    ApiUserSteps,
    ApiDataSteps,
    _requestsFactory,
    _exuiDashboardPageFactory,
    ClaimantResponseSpecSteps,
  }) => {
    await ApiUserSteps.SetupUserData(civilAdminUser);
    // await ApiDataSteps.SetupBankHolidaysData();
    await IdamSteps.ClaimantSolicitorLogin();
    await ClaimantResponseSpecSteps.SmallTrack1v2DS();
  },
);

test('Testing 2v1 Small Claim', async ({
  IdamSteps,
  ApiUserSteps,
  ApiDataSteps,
  _requestsFactory,
  _exuiDashboardPageFactory,
  ClaimantResponseSpecSteps,
}) => {
  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSpecSteps.SmallTrack2v1();
});
