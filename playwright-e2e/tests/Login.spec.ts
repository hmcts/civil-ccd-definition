import { civilAdminUser } from '../config/users/exui-users';
import ccdEvents from '../constants/ccd-events';
import { test } from '../playwright-fixtures/index';

test('Testing Login', async ({
  IdamSteps,
  ExuiDashboardSteps,
  CreateClaimSteps,
  ApiUserSteps,
  ApiDataSteps,
  _requestsFactory,
  _exuiDashboardPageFactory,
  _notifyClaimPageFactory,
}) => {
  // await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await CreateClaimSteps.SmallTrack1v2DS();

  // const { ccdRequests } = _requestsFactory;
  // const ccdCaseData = await ccdRequests.fetchCCDCaseData(1732120625619001, civilAdminUser);

  // const { caseDetailsPage } = _exuiDashboardPageFactory;
  // await caseDetailsPage.goToCaseDetails(1732120625619001);
  // await caseDetailsPage.verifyContent(ccdCaseData);
  // await caseDetailsPage.retryChooseNextStep(ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM);

  // const { certificateOfService1NotifyClaimPage } = _notifyClaimPageFactory;
  // await certificateOfService1NotifyClaimPage.verifyContent(ccdCaseData);
  // await certificateOfService1NotifyClaimPage.fillDetails();
  // await certificateOfService1NotifyClaimPage.submit();

  // const { certificateOfService2NotifyClaimPage } = _notifyClaimPageFactory;
  // await certificateOfService2NotifyClaimPage.verifyContent(ccdCaseData);
  // await certificateOfService2NotifyClaimPage.fillDetails();
  // await certificateOfService2NotifyClaimPage.submit();

  // const { notifyClaimCOSSubmitPage } = _notifyClaimPageFactory;
  // await notifyClaimCOSSubmitPage.verifyContent(ccdCaseData);

  // await notifyClaimDetailsCOSSubmitPage.submit();
});
