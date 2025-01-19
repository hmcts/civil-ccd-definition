import { civilAdminUser } from '../config/users/exui-users';
import ccdEvents from '../constants/ccd-events';
import { test } from '../playwright-fixtures/index';

test('Testing Login', async ({
  IdamSteps,
  ExuiDashboardSteps,
  ApiUserSteps,
  ApiDataSteps,
  _requestsFactory,
  _exuiDashboardPageFactory,
  _notifyClaimPageFactory,
}) => {
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

  // const { certificateOfService1Page } = _notifyClaimPageFactory;
  // await certificateOfService1Page.verifyContent(ccdCaseData);
  // await certificateOfService1Page.fillDetails();
  // await certificateOfService1Page.submit();

  // const { certificateOfService2Page } = _notifyClaimPageFactory;
  // await certificateOfService2Page.verifyContent(ccdCaseData);
  // await certificateOfService2Page.fillDetails();
  // await certificateOfService2Page.submit();

  // const { notifyClaimCOSSubmitPage } = _notifyClaimPageFactory;
  // await notifyClaimCOSSubmitPage.verifyContent(ccdCaseData);

  // await notifyClaimDetailsCOSSubmitPage.submit();
});
