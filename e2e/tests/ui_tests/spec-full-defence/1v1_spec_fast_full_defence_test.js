const config = require('../../../config.js');
const { assignCaseToLRSpecDefendant, waitForFinishedBusinessProcess } = require('../../../api/testingSupport');
const { addUserCaseMapping, unAssignAllUsers } = require('../../../api/caseRoleAssignmentHelper');
const serviceRequest = require('../../../pages/createClaim/serviceRequest.page');
const claimDocumentHelper = require('../../../helpers/claimDocumentHelper.js');
// Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
//const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;

const TEST_DIR = 'e2e/tests/ui_tests/spec-full-defence';
const BASELINE_DIR = 'e2e/pdf-baselines/ui-spec-full-defence';

const SEALED_CLAIM_PDF = 'sealed_claim_form.pdf';
const DEFENDANT_DIRECTIONS_QUESTIONNAIRE_PDF = 'defendant_directions_questionnaire.pdf';
const DEFENDANT_DEFENCE_PDF = 'response_sealed_form.pdf';
const CLAIMANT_DIRECTIONS_QUESTIONNAIRE_PDF = 'claimant_directions_questionnaire.pdf';

let caseNumber;

Feature('1v1 spec claim journey').tag('@civil-ccd-nightly @ui-spec-full-defence');

Scenario('01 1v1 Applicant solicitor creates specified claim for fast track-spec', async ({ LRspec }) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.createCaseSpecified('1v1 fast claim', 'organisation', null, 'company', null, 19000);
  caseNumber = await LRspec.grabCaseNumber();
  await serviceRequest.openServiceRequestTab();
  await serviceRequest.payFee(caseNumber);

  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await LRspec.see(`Case ${caseNumber} has been created.`);
  addUserCaseMapping(caseNumber, config.applicantSolicitorUser);
}).retry(2);

Scenario('02 1v1 Defendant solicitor perform Inform Agreed Extension', async ({ LRspec, I }) => {
  console.log('1v1 Defendant solicitor Inform Agreed Extension claim-spec: ' + caseNumber);
  await assignCaseToLRSpecDefendant(caseNumber);
  await LRspec.login(config.defendantSolicitorUser);
  //await LRspec.informAgreedExtensionDateSpec();
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await LRspec.see(caseEventMessage('Inform agreed extension date')); 
}).retry(2);

Scenario('03 1v1 Respond To Claim - Defendants solicitor rejects claim for defendant', async ({ LRspec, I }) => {
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.respondToClaimFullDefence({
    defendant1Response: 'fullDefence',
    claimType: 'fast',
    defenceType: 'dispute'
  });

  await waitForFinishedBusinessProcess(caseNumber);

  await I.navigateToCaseDetails(caseNumber);
  await I.waitForText('Summary');

  await claimDocumentHelper.viewAndAssertPdf(I, 'defendant_directions_questionnaire_form', TEST_DIR, BASELINE_DIR, DEFENDANT_DIRECTIONS_QUESTIONNAIRE_PDF);
  await claimDocumentHelper.viewAndAssertPdf(I, 'response_sealed_form', TEST_DIR, BASELINE_DIR, DEFENDANT_DEFENCE_PDF);

  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await LRspec.see(caseEventMessage('Respond to claim'));
}).retry(2);

Scenario('04 1v1 Claimant solicitor responds to defence - claimant Intention to proceed', async ({ LRspec, I }) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.respondToDefence({ mpScenario: 'ONE_V_ONE', claimType: 'fast' });

  await I.navigateToCaseDetails(caseNumber);
  await I.waitForText('Summary');

  await claimDocumentHelper.viewAndAssertPdf(I, 'sealed_claim_form', TEST_DIR, BASELINE_DIR, SEALED_CLAIM_PDF);
  await claimDocumentHelper.viewAndAssertPdf(I, 'claimant_directions_questionnaire_form', TEST_DIR, BASELINE_DIR, CLAIMANT_DIRECTIONS_QUESTIONNAIRE_PDF);
}).retry(2);


AfterSuite(async () => {
  await unAssignAllUsers();
});
