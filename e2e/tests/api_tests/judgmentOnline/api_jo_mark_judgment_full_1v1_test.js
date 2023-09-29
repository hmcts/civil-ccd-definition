const config = require('../../../config.js');

const mpScenario = 'ONE_V_ONE';
const caseWorkerUser = config.hearingCenterAdminWithRegionId1;
// to use on local because the idam images are different
//const caseWorkerUser = config.tribunalCaseworkerWithRegionId1Local;
const claimAmountJudge = '11000';
Feature('Mark Judgment paid in full 1v1 API test unspec @api-unspec @api-tests-1v1 @api-jo @api-nonprod');

async function prepareClaim(api, claimAmount) {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmount);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, null, 'FAST_CLAIM');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
  await api.createFinalOrderJO(caseWorkerUser, 'FREE_FORM_ORDER');
}

Scenario('1v1 full defence unspecified - Mark payment full within 30 days', async ({api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountJudge);
    await api.recordJudgment(caseWorkerUser, mpScenario, 'JUDGE_ORDER', 'PAY_IN_INSTALMENTS');
    await api.markJudgmentPaid(caseWorkerUser);
  }
});

Scenario('1v1 full defence unspecified - Mark payment full after 30 days', async ({api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountJudge);
    await api.recordJudgment(caseWorkerUser, mpScenario, 'JUDGE_ORDER', 'PAY_IMMEDIATELY');
    await api.markJudgmentPaid(caseWorkerUser);
  }
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
