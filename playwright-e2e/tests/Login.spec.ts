import { hearingCenterAdminRegion1User } from '../config/users/exui-users';
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
    _caseProceedsInCasemanPageFactory,
  }) => {
    // await ApiUserSteps.SetupUserData(civilAdminUser);
    // await ApiDataSteps.SetupBankHolidaysData();
    await IdamSteps.HearingCentreAdmin1Login();
    await ExuiDashboardSteps.GoToCaseList();

    const { ccdRequests } = _requestsFactory;
    const ccdCaseData = await ccdRequests.fetchCCDCaseData(
      hearingCenterAdminRegion1User,
      1734605460487546,
    );

    const { caseDetailsPage } = _exuiDashboardPageFactory;
    await caseDetailsPage.goToCaseDetails(1734605460487546);
    await caseDetailsPage.verifyContent(ccdCaseData);
    await caseDetailsPage.retryChooseNextStep(ccdEvents.CASE_PROCEEDS_IN_CASEMAN);

    const { caseProceedsInCasemanPage } = _caseProceedsInCasemanPageFactory;
    await caseProceedsInCasemanPage.verifyContent(ccdCaseData);
    await caseProceedsInCasemanPage.enterDate();
    await caseProceedsInCasemanPage.selectProceedOnPaperReasonApplication();
    await caseProceedsInCasemanPage.submit();
  },
);
