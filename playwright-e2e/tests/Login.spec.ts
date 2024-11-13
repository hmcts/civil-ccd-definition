import { civilAdminUser } from '../config/users/exui-users';
import ccdEvents from '../fixtures/ccd-events/events';
import { test } from '../playwright-fixtures/index';

test('Testing Login', async ({ IdamSteps, ExuiDashboardSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, _informAgreedExtensionDateFactory }) => {
  await ApiUserSteps.SetupUserData(civilAdminUser);
  await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.DefendantSolicitor1Login();
  await ExuiDashboardSteps.GoToCaseList();

  const { ccdRequests } = _requestsFactory;
  const ccdCaseData = await ccdRequests.fetchCCDCaseData(1731412260455051, civilAdminUser);

  const { caseDetailsPage } = _exuiDashboardPageFactory;
  await caseDetailsPage.goToCaseDetails(1731412260455051);
  await caseDetailsPage.verifyContent(ccdCaseData);
  await caseDetailsPage.retryChooseNextStep(ccdEvents.INFORM_AGREED_EXTENSION_DATE);

  const { extensionDatePage } = _informAgreedExtensionDateFactory;
  await extensionDatePage.verifyContentDefendant1(ccdCaseData);
  await extensionDatePage.submit();

  const { informAgreedExtensionDateConfirmPage } = _informAgreedExtensionDateFactory;
  await informAgreedExtensionDateConfirmPage.verifyContent(ccdCaseData);
  await informAgreedExtensionDateConfirmPage.submit();
});
