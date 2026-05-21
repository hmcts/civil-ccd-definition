const config = require('../../../config.js');
const claimDocumentHelper = require('../../../helpers/claimDocumentHelper.js');

const TEST_DIR = 'e2e/tests/api_tests/spec-full-defence';
const BASELINE_DIR = 'e2e/pdf-baselines/api-spec-full-defence';

const SEALED_CLAIM_PDF = 'sealed_claim_form.pdf';
const DEFENDANT_DIRECTIONS_QUESTIONNAIRE_PDF = 'defendant_directions_questionnaire.pdf';
const DEFENDANT_DEFENCE_PDF = 'response_sealed_form.pdf';
const CLAIMANT_DIRECTIONS_QUESTIONNAIRE_PDF = 'claimant_directions_questionnaire.pdf';

Feature('1v1 spec full defence api journey').tag('@civil-service-nightly @api-spec-full-defence');

Scenario('1v1 spec full defence', async ({ api_spec, I }) => {
  const caseId = await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);

  await I.login(config.applicantSolicitorUser);
  await I.navigateToCaseDetails(caseId);
  await I.waitForText('Summary');

  await claimDocumentHelper.viewAndAssertPdf(I, 'sealed_claim_form', TEST_DIR, BASELINE_DIR, SEALED_CLAIM_PDF);

  await api_spec.informAgreedExtensionDate(config.applicantSolicitorUser);
  await api_spec.defendantResponse(config.defendantSolicitorUser);

  await I.login(config.defendantSolicitorUser);
  await I.navigateToCaseDetails(caseId);
  await I.waitForText('Summary');

  await claimDocumentHelper.viewAndAssertPdf(I, 'defendant_directions_questionnaire_form', TEST_DIR, BASELINE_DIR, DEFENDANT_DIRECTIONS_QUESTIONNAIRE_PDF);
  await claimDocumentHelper.viewAndAssertPdf(I, 'response_sealed_form', TEST_DIR, BASELINE_DIR, DEFENDANT_DEFENCE_PDF);

  await api_spec.claimantResponse(
    config.applicantSolicitorUser,
    'FULL_DEFENCE',
    'ONE_V_ONE',
    'AWAITING_APPLICANT_INTENTION'
  );

  await I.login(config.applicantSolicitorUser);
  await I.navigateToCaseDetails(caseId);
  await I.waitForText('Summary');

  await claimDocumentHelper.viewAndAssertPdf(I, 'claimant_directions_questionnaire_form', TEST_DIR, BASELINE_DIR, CLAIMANT_DIRECTIONS_QUESTIONNAIRE_PDF);
});

AfterSuite(async ({ api_spec }) => {
  await api_spec.cleanUp();
});
