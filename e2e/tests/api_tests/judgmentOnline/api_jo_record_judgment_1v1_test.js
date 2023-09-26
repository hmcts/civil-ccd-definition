const config = require('../../../config.js');

const mpScenario = 'ONE_V_ONE';
const judgeUser = config.judgeUserWithRegionId1;
// const legalAdvUser = config.tribunalCaseworkerWithRegionId4;
// to use on local because the idam images are different
// const judgeUser = config.judgeUserWithRegionId1Local;
const legalAdvUser = config.tribunalCaseworkerWithRegionId1Local; //TODO change to tribunalCaseworkerWithRegionId4 ???
const claimAmountJudge = '11000';
let fastTrackDirectionsTask, taskId;
let smallClaimDirectionsTask, legalAdvisorSmallClaimsTrackDirectionsTask;
let transferOfflineSdoTask;
if (config.runWAApiTest) {
  fastTrackDirectionsTask = require('../../../../wa/tasks/fastTrackDirectionsTask.js');
  smallClaimDirectionsTask = require('../../../../wa/tasks/smallClaimDirectionsTask.js');
  legalAdvisorSmallClaimsTrackDirectionsTask = require('../../../../wa/tasks/legalAdvisorSmallClaimsTrackDirectionsTask.js');
  transferOfflineSdoTask = require('../../../../wa/tasks/transferOfflineSdo.js');
}

Feature('Record Judgment 1v1 API test unspec @api-unspec @api-tests-1v1 @api-jo @api-non-prod-jo');

async function prepareClaim(api, claimAmount) {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmount);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, null, 'FAST_CLAIM');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
  await api.createFinalOrderJO(judgeUser, 'FREE_FORM_ORDER');
}

Scenario('1v1 full defence unspecified - caseworker records judgment (Det.of means - pay instalments)', async ({api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountJudge);
    await api.recordJudgment(legalAdvUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_IN_INSTALMENTS');
  }
});

Scenario('1v1 full defence unspecified - caseworker records judgment (Det.of means - pay by date)', async ({api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountJudge);
    await api.recordJudgment(legalAdvUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_BY_DATE');
  }
});

Scenario('1v1 full defence unspecified - caseworker records judgment (Det.of means - pay immediately)', async ({api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountJudge);
    await api.recordJudgment(legalAdvUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_IMMEDIATELY');
  }
});

Scenario('1v1 full defence unspecified - caseworker records judgment (Judge Order - pay instalments)', async ({api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountJudge);
    await api.recordJudgment(legalAdvUser, mpScenario, 'JUDGE_ORDER', 'PAY_IN_INSTALMENTS');
  }
});

Scenario('1v1 full defence unspecified - caseworker records judgment (Judge Order - pay by date)', async ({api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountJudge);
    await api.recordJudgment(legalAdvUser, mpScenario, 'JUDGE_ORDER', 'PAY_BY_DATE');
  }
});

Scenario('1v1 full defence unspecified - caseworker records judgment (Judge Order - pay immediately)', async ({api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountJudge);
    await api.recordJudgment(legalAdvUser, mpScenario, 'JUDGE_ORDER', 'PAY_IMMEDIATELY');
  }
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
