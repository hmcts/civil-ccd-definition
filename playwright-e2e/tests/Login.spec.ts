import { civilAdminUser } from '../config/users/exui-users';
import ccdEvents from '../fixtures/ccd-events/events';
import { test } from '../playwright-fixtures/index';

test('Testing Login', async ({ IdamSteps, ExuiDashboardSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, _informAgreedExtensionDateFactory }) => {
  await IdamSteps.DefendantSolicitor1Login();
  await ExuiDashboardSteps.GoToCaseList();
  await ApiUserSteps.SetupUserData(civilAdminUser);
  await ApiDataSteps.SetupBankHolidaysData();

  const { ccdRequests } = _requestsFactory;
  const caseData = await ccdRequests.fetchCCDCaseData(1730881461840108, civilAdminUser);

  const { caseDetailsPage } = _exuiDashboardPageFactory;
  await caseDetailsPage.goToCaseDetails(1730881461840108);
  await caseDetailsPage.verifyContent(caseData);
  await caseDetailsPage.retryChooseNextStep(ccdEvents.INFORM_AGREED_EXTENSION_DATE);

  const { extensionDatePage } = _informAgreedExtensionDateFactory;
  await extensionDatePage.verifyContent(caseData);
  await extensionDatePage.submit();

  const { informAgreedExtensionDateConfirmPage } = _informAgreedExtensionDateFactory;
  await informAgreedExtensionDateConfirmPage.verifyContent(caseData);
  await informAgreedExtensionDateConfirmPage.submit();
});
