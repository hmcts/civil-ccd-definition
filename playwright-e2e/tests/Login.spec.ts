import { civilAdminUser } from '../config/users/exui-users';
import ccdEvents from '../fixtures/ccd-events/events';
import { test } from '../playwright-fixtures/index';

test(
  'Testing Login',
  { tag: '@debug' },
  async ({
    IdamSteps,
    ExuiDashboardSteps,
    ApiUserSteps,
    ApiDataSteps,
    _requestsFactory,
    _exuiDashboardPageFactory,
    _notifyClaimPageFactory,
    _acknowledgeClaimPageFactory,
  }) => {
    await ApiUserSteps.SetupUserData(civilAdminUser);
    // await ApiDataSteps.SetupBankHolidaysData();
    await IdamSteps.DefendantSolicitor1Login();
    await ExuiDashboardSteps.GoToCaseList();

    const { ccdRequests } = _requestsFactory;
    const ccdCaseData = await ccdRequests.fetchCCDCaseData(civilAdminUser, 1734100864400154);

    const { caseDetailsPage } = _exuiDashboardPageFactory;
    await caseDetailsPage.goToCaseDetails(1734100864400154);
    await caseDetailsPage.verifyContent(ccdCaseData);
    await caseDetailsPage.retryChooseNextStep(ccdEvents.ACKNOWLEDGE_CLAIM);

    const { confirmNameAndAddressPage } = _acknowledgeClaimPageFactory;
    await confirmNameAndAddressPage.verifyContent(ccdCaseData);
    await confirmNameAndAddressPage.enterDob(1, 1, 1990);
    await confirmNameAndAddressPage.submit();

    const { responseIntensionPage } = _acknowledgeClaimPageFactory;
    await responseIntensionPage.verifyContent(ccdCaseData);
    await responseIntensionPage.selectDefendAllClaim();
    await responseIntensionPage.submit();

    const { solicitorReferencesPage } = _acknowledgeClaimPageFactory;
    await solicitorReferencesPage.verifyContent(ccdCaseData);
    await solicitorReferencesPage.fillInput();
    await solicitorReferencesPage.submit();
  },
);
