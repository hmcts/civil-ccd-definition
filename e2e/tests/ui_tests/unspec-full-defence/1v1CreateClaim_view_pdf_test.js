const config = require('../../../config.js');

const { PUBLIC_QUERY } = require('../../../fixtures/queryTypes');
const pdfHelper = require('../../../helpers/pdfVisualCompareHelper.js');

const claimAmountPenniesIntermediate = '9900000';
const claimAmountIntermediate = '99000';
const judgeUser = config.judgeUserWithRegionId1;
const pdfDocument = 'defendant_directions_questionnaire_form_00';
const claimDocumentsTab = '.mat-tab-label:has-text("Claim Documents")';
const PDF_NAME = 'defendant_directions_questionnaire_form.pdf';

let caseId;

Feature('Query Management - Raise, Respond and Follow up Queries')
  .tag('@civil-ccd-nightly @ui-qm');

Scenario('01 Claimant validates defendant directions questionnaire PDF after query follow up', async ({ api_spec, I, qmSteps }) => {
  const mpScenario = 'ONE_V_ONE';

  caseId = await api_spec.createClaimWithRepresentedRespondent(
    config.applicantSolicitorUser,
    mpScenario,
    false,
    true,
    claimAmountPenniesIntermediate
  );

  await api_spec.defendantResponse(
    config.defendantSolicitorUser,
    'FULL_DEFENCE',
    mpScenario,
    'AWAITING_APPLICANT_INTENTION',
    false,
    true,
    claimAmountIntermediate
  );

  await api_spec.claimantResponse(
    config.applicantSolicitorUser,
    'FULL_DEFENCE',
    mpScenario,
    'JUDICIAL_REFERRAL',
    false,
    true
  );

  await api_spec.createFinalOrderJO(
    judgeUser,
    'DOWNLOAD_ORDER_TEMPLATE',
    'INTERMEDIATE'
  );

  const query = await qmSteps.raiseLRQuery(
    caseId,
    config.applicantSolicitorUser,
    PUBLIC_QUERY,
    false
  );

  await qmSteps.respondToQuery(
    caseId,
    config.ctscAdminUser,
    query,
    PUBLIC_QUERY
  );

  await I.login(config.applicantSolicitorUser);
  await I.navigateToCaseDetails(caseId);
  await I.waitForText('Summary');

  I.click(claimDocumentsTab);
  I.click(pdfDocument);

  await I.wait(2);
  I.switchToNextTab();

  const pdfPaths = pdfHelper.getPdfPaths(
    'e2e/tests/ui_tests/unspec-full-defence',
    PDF_NAME
  );

  await pdfHelper.downloadPdfAndAssertVisualMatch({
    I,
    ...pdfPaths
  });
});

AfterSuite(async ({ api_spec }) => {
  await api_spec.cleanUp();
});