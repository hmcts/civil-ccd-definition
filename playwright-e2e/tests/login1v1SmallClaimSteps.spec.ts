import { civilAdminUser } from '../config/users/exui-users';
import { test } from '../playwright-fixtures/index';

// test('Testing 1v1small Claim ', {tag:""},async ({ IdamSteps, ExuiDashboardSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory,_claimantResponsePageFactory }) => {
//   await ApiUserSteps.SetupUserData(civilAdminUser);
//   // await ApiDataSteps.SetupBankHolidaysData();
//   await IdamSteps.ClaimantSolicitorLogin();
//   await ExuiDashboardSteps.GoToCaseList();
//
//   const { ccdRequests } = _requestsFactory;
//   const ccdCaseData = await ccdRequests.fetchCCDCaseData( civilAdminUser, 1735901845727550);
//
//   const { caseDetailsPage } = _exuiDashboardPageFactory;
//   await caseDetailsPage.goToCaseDetails( 1735901845727550);
//   await caseDetailsPage.verifyContent(ccdCaseData);
//   await caseDetailsPage.retryChooseNextStep(ccdEvents.CLAIMANT_RESPONSE_SPEC);
// });

test(
  'Testing 1v1 Unspec small Claim ',
  { tag: '@debug' },
  async ({
    IdamSteps,
    ExuiDashboardSteps,
    ApiUserSteps,
    ApiDataSteps,
    _requestsFactory,
    _exuiDashboardPageFactory,
    ClaimantResponseSteps,
  }) => {
    await ApiUserSteps.SetupUserData(civilAdminUser);
    // await ApiDataSteps.SetupBankHolidaysData();
    await IdamSteps.ClaimantSolicitorLogin();
    await ClaimantResponseSteps.SmallTrack1v1();
  },
);
