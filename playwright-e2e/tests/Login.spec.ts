import { civilAdminUser } from '../config/users/exui-users';
import ccdEvents from '../fixtures/ccd-events/events';
import { test } from '../playwright-fixtures/index';

test('Testing Login', async ({ IdamSteps, ExuiDashboardSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, _informAgreedExtensionDateFactory }) => {
  await IdamSteps.DefendantSolicitor1Login();
  await ExuiDashboardSteps.GoToCaseList();
  await ApiUserSteps.SetupUserData(civilAdminUser);
  await ApiDataSteps.SetupBankHolidaysData();

  const { ccdRequests } = _requestsFactory;
  const caseData = await ccdRequests.fetchCCDCaseData(1731059303866081, civilAdminUser);

  const { caseDetailsPage } = _exuiDashboardPageFactory;
  await caseDetailsPage.goToCaseDetails(1731059303866081);
  await caseDetailsPage.verifyContent(caseData);
  await caseDetailsPage.retryChooseNextStep(ccdEvents.INFORM_AGREED_EXTENSION_DATE_SPEC);

  const { extensionDateSpecPage } = _informAgreedExtensionDateFactory;
  await extensionDateSpecPage.verifyContent();
  await extensionDateSpecPage.enterDate(caseData);
  await extensionDateSpecPage.submit();

  const { informAgreedExtensionDateConfirmSpecPage } = _informAgreedExtensionDateFactory;
  await informAgreedExtensionDateConfirmSpecPage.verifyContent(caseData);
  await informAgreedExtensionDateConfirmSpecPage.submit();
});
