const config = require('../../../config.js');
const { APPLICANT_SOLICITOR_QUERY } = require('../../../fixtures/queryTypes');

const claimAmountPenniesIntermediate = '9900000';
const claimAmountIntermediate = '99000';
const judgeUser = config.judgeUserWithRegionId1;
let caseId;

Feature('Query Management - Raise, Respond and Follow up Queries  @qm-spec @non-prod-e2e-ft');

async function prepareClaim(api_spec, mpScenario) {
  caseId = await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, false, true, claimAmountPenniesIntermediate);
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', mpScenario, 'AWAITING_APPLICANT_INTENTION', false, true, claimAmountIntermediate);
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', mpScenario, 'JUDICIAL_REFERRAL', false, true);
  await api_spec.createFinalOrderJO(judgeUser, 'DOWNLOAD_ORDER_TEMPLATE', 'INTERMEDIATE');
}

Scenario('Claimant Follow up a query', async ({ api_spec, I, qmSteps }) => {
  const mpScenario = 'ONE_V_ONE';
  await prepareClaim(api_spec, mpScenario);
  const query = await qmSteps.raiseLRQuery(caseId, config.applicantSolicitorUser, APPLICANT_SOLICITOR_QUERY, false);
  await qmSteps.respondToQuery(caseId, config.ctscAdminUser, query, APPLICANT_SOLICITOR_QUERY);
  await I.login(config.applicantSolicitorUser);
  await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId);
  await I.waitForText('Summary');
  await I.raiseFollowUpQuestionAndVerify(true);
});

Scenario('CaseWorker can access and also responds back to a query', async ({ I }) => {
  await I.login(config.ctscAdminUser);
  await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId);
  await I.waitForText('Summary');
  await I.verifyFollowUpQuestionAsCaseWorker(true);
});

Scenario('Judge can access to a query', async ({ I }) => {
  await I.login(config.judgeUserWithRegionId1);
  await I.amOnPage(config.url.manageCase + '/cases/case-details/' + '1748431606108878');
  await I.waitForText('Summary');
  await I.verifyFollowUpQuestionAsJudge(true);
});

AfterSuite(async ({ api_spec }) => {
  await api_spec.cleanUp();
});
