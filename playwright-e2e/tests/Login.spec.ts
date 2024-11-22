import { civilAdminUser } from '../config/users/exui-users';
import ccdEvents from '../fixtures/ccd-events/events';
import { test } from '../playwright-fixtures/index';

test('Testing Login', async ({ IdamSteps, ExuiDashboardSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, _notifyClaimPageFactory }) => {
  // await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ExuiDashboardSteps.GoToCaseList();

  // const { ccdRequests } = _requestsFactory;
  // const ccdCaseData = await ccdRequests.fetchCCDCaseData(1732120625619001, civilAdminUser);

  // const { caseDetailsPage } = _exuiDashboardPageFactory;
  // await caseDetailsPage.goToCaseDetails(1732120625619001);
  // await caseDetailsPage.verifyContent(ccdCaseData);
  // await caseDetailsPage.retryChooseNextStep(ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM);

  // const { notifyClaimCOSDefendant1Page } = _notifyClaimPageFactory;
  // await notifyClaimCOSDefendant1Page.verifyContent(ccdCaseData);
  // await notifyClaimCOSDefendant1Page.fillDetails();
  // await notifyClaimCOSDefendant1Page.submit();

  // const { notifyClaimCOSDefendant2Page } = _notifyClaimPageFactory;
  // await notifyClaimCOSDefendant2Page.verifyContent(ccdCaseData);
  // await notifyClaimCOSDefendant2Page.fillDetails();
  // await notifyClaimCOSDefendant2Page.submit();

  // const { notifyClaimCOSSubmitPage } = _notifyClaimPageFactory;
  // await notifyClaimCOSSubmitPage.verifyContent(ccdCaseData);

  // await notifyClaimDetailsCOSSubmitPage.submit();
});
