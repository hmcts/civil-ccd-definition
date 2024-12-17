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
    _createCaseFlagsPageFactory,
  }) => {
    // await ApiUserSteps.SetupUserData(civilAdminUser);
    // await ApiDataSteps.SetupBankHolidaysData();
    await IdamSteps.HearingCentreAdmin1Login();
    await ExuiDashboardSteps.GoToCaseList();

    const { ccdRequests } = _requestsFactory;
    const ccdCaseData = await ccdRequests.fetchCCDCaseData(
      hearingCenterAdminRegion1User,
      1734440315594472,
    );

    const { caseDetailsPage } = _exuiDashboardPageFactory;
    await caseDetailsPage.goToCaseDetails(1734440315594472);
    await caseDetailsPage.verifyContent(ccdCaseData);
    await caseDetailsPage.retryChooseNextStep(ccdEvents.CREATE_CASE_FLAGS);

    const { createCaseFlagsPage } = _createCaseFlagsPageFactory;
    await createCaseFlagsPage.verifyContent(ccdCaseData);
    await createCaseFlagsPage.selectRadioButton(0);
    await createCaseFlagsPage.clickNext();
    await createCaseFlagsPage.selectFlagTypeRadioButton(0);
    await createCaseFlagsPage.clickNext();
    await createCaseFlagsPage.enterComment();
    await createCaseFlagsPage.clickNext();
    await createCaseFlagsPage.submit();
  },
);
