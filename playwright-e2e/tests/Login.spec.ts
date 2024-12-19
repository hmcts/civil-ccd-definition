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
    const ccdCaseData = await ccdRequests.fetchCCDCaseData(civilAdminUser, 1734434564449116);

    const { caseDetailsPage } = _exuiDashboardPageFactory;
    await caseDetailsPage.goToCaseDetails(1734434564449116);
    await caseDetailsPage.verifyContent(ccdCaseData);
    await caseDetailsPage.retryChooseNextStep(ccdEvents.ACKNOWLEDGE_CLAIM);

    const { confirmNameAndAddressPage } = _acknowledgeClaimPageFactory;
    await confirmNameAndAddressPage.verifyContent(ccdCaseData);
    await confirmNameAndAddressPage.enterDob(1, 1, 1990);
    await confirmNameAndAddressPage.submit();

    const { responseIntensionPage } = _acknowledgeClaimPageFactory;
    await responseIntensionPage.verifyContent(ccdCaseData);
    await responseIntensionPage.selectDefendAllClaim(1);
    await responseIntensionPage.submit();

    const { solicitorReferencesPage } = _acknowledgeClaimPageFactory;
    await solicitorReferencesPage.verifyContent(ccdCaseData);
    await solicitorReferencesPage.fillInput();
    await solicitorReferencesPage.submit();

    await IdamSteps.DefendantSolicitor2Login();
    await ExuiDashboardSteps.GoToCaseList();
    await caseDetailsPage.goToCaseDetails(1734434564449116);
    await caseDetailsPage.verifyContent(ccdCaseData);
    await caseDetailsPage.retryChooseNextStep(ccdEvents.ACKNOWLEDGE_CLAIM);

    const { confirmNameAndAddressPage2 } = _acknowledgeClaimPageFactory;
    await confirmNameAndAddressPage2.verifyContent(ccdCaseData);
    await confirmNameAndAddressPage2.enterDob(1, 1, 1990);
    await confirmNameAndAddressPage2.submit();

    const { responseIntensionPage2 } = _acknowledgeClaimPageFactory;
    await responseIntensionPage2.verifyContent(ccdCaseData);
    await responseIntensionPage2.selectDefendAllClaim(2);
    await responseIntensionPage2.submit();

    const { solicitorReferencesPage2 } = _acknowledgeClaimPageFactory;
    await solicitorReferencesPage2.verifyContent(ccdCaseData);
    await solicitorReferencesPage2.fillInputResp2();
    await solicitorReferencesPage2.submit();
  },
);
