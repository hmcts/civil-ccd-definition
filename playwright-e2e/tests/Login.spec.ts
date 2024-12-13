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
    _defaultJudgmentPageFactory,
  }) => {
    await ApiUserSteps.SetupUserData(civilAdminUser);
    // await ApiDataSteps.SetupBankHolidaysData();
    await IdamSteps.ClaimantSolicitorLogin();
    await ExuiDashboardSteps.GoToCaseList();

    const { ccdRequests } = _requestsFactory;
    const ccdCaseData = await ccdRequests.fetchCCDCaseData(civilAdminUser, 1734017218958853);

    const { caseDetailsPage } = _exuiDashboardPageFactory;
    await caseDetailsPage.goToCaseDetails(1734017218958853);
    await caseDetailsPage.verifyContent(ccdCaseData);
    await caseDetailsPage.retryChooseNextStep(ccdEvents.DEFAULT_JUDGEMENT);

    const { defendantDetailsPage } = _defaultJudgmentPageFactory;
    await defendantDetailsPage.verifyContent(ccdCaseData);
    await defendantDetailsPage.selectDefendant('Sir John Doe');
    await defendantDetailsPage.submit();

    const { showCertifyStatementPage } = _defaultJudgmentPageFactory;
    await showCertifyStatementPage.verifyContent(ccdCaseData);
    await showCertifyStatementPage.verifyText();
    await showCertifyStatementPage.selectCheckbox();
    await showCertifyStatementPage.submit();

    const { hearingTypePage } = _defaultJudgmentPageFactory;
    await hearingTypePage.verifyContent(ccdCaseData);
    await hearingTypePage.verifyText();
    await hearingTypePage.selectDisposalHearing();
    await hearingTypePage.submit();

    const { hearingSupportRequirementsFieldPage } = _defaultJudgmentPageFactory;
    await hearingSupportRequirementsFieldPage.verifyContent(ccdCaseData);
    await hearingSupportRequirementsFieldPage.selectTelephone();
    await hearingSupportRequirementsFieldPage.selectCourtLocation();
    await hearingSupportRequirementsFieldPage.inputTelephoneNumber();
    await hearingSupportRequirementsFieldPage.inputEmail();
    await hearingSupportRequirementsFieldPage.selectYesCannotAttend();
    await hearingSupportRequirementsFieldPage.addNewUnavailableDate();
    await hearingSupportRequirementsFieldPage.selectNoRequireSupport();
    await hearingSupportRequirementsFieldPage.submit();
  },
);
