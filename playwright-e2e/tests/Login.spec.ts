import { civilAdminUser } from '../config/users/exui-users';
import ccdEvents from '../fixtures/ccd-events/events';
import { test } from '../playwright-fixtures/index';

test('Testing Login', async ({ IdamSteps, ExuiDashboardSteps, ApiUserSteps, _requestsFactory, _exuiDashboardPageFactory, _informAgreedExtensionDateFactory }) => {
  await IdamSteps.DefendantSolicitor1Login();
  await ExuiDashboardSteps.GoToCaseList();
  await ApiUserSteps.SetupUserData(civilAdminUser);

  const { ccdRequests } = _requestsFactory;
  const caseData = await ccdRequests.fetchCcdCaseData(1730456854320263, civilAdminUser);

  const { caseDetailsPage } = _exuiDashboardPageFactory;
  await caseDetailsPage.goToCaseDetails(1730456854320263);
  await caseDetailsPage.verifyContent(caseData);
  await caseDetailsPage.retryChooseNextStep(ccdEvents.INFORM_AGREED_EXTENSION_DATE_SPEC);

  const { extensionDateSpecPage } = _informAgreedExtensionDateFactory;
  await extensionDateSpecPage.verifyContent();
  await extensionDateSpecPage.enterDate(caseData);
  await extensionDateSpecPage.submit();
});
