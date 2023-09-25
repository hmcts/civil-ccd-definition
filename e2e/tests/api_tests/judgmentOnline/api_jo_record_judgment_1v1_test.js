const config = require('../../../config.js');

const mpScenario = 'ONE_V_ONE';
const judgeUser = config.judgeUserWithRegionId1;
const legalAdvUser = config.tribunalCaseworkerWithRegionId4;
// to use on local because the idam images are different
// const judgeUser = config.judgeUserWithRegionId1Local;
// const legalAdvUser = config.tribunalCaseworkerWithRegionId1Local;
const claimAmountJudge = '11000';
const claimAmountAdvisor = '100';
let fastTrackDirectionsTask, taskId;
let smallClaimDirectionsTask, legalAdvisorSmallClaimsTrackDirectionsTask;
let transferOfflineSdoTask;
if (config.runWAApiTest) {
  fastTrackDirectionsTask = require('../../../../wa/tasks/fastTrackDirectionsTask.js');
  smallClaimDirectionsTask = require('../../../../wa/tasks/smallClaimDirectionsTask.js');
  legalAdvisorSmallClaimsTrackDirectionsTask = require('../../../../wa/tasks/legalAdvisorSmallClaimsTrackDirectionsTask.js');
  transferOfflineSdoTask = require('../../../../wa/tasks/transferOfflineSdo.js');
}

Feature('CCD 1v1 API test');

async function prepareClaim(api, claimAmount) {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmount);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, null, 'FAST_CLAIM');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
}

Scenario('1v1 full defence unspecified - caseworker records judgment (Det.of means - pay instalments) @api-jo @api-non-prod-jo', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountJudge);
    await api.createFinalOrderJO(config.judgeUserWithRegionId1, 'FREE_FORM_ORDER');
    await api.recordJudgment(config.tribunalCaseworkerWithRegionId1Local, 'DETERMINATION_OF_MEANS', 'PAY_IN_INSTALMENTS'); //TODO change to tribunalCaseworkerWithRegionId4 ???
  }
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
