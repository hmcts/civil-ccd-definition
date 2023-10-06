const config = require('../../../config.js');

const mpScenario = 'ONE_V_ONE';
const judgeUser = config.judgeUserWithRegionId1;
// to use on local because the idam images are different
// const judgeUser = config.judgeUserWithRegionId1Local;
const claimAmountJudge = '11000';

Feature('Transfer Online Case 1v1 API test unspec @api-unspec @api-tests-1v1 @api-nonprod');

Scenario('1v1 full defence unspecified - judge user - not suitable SDO - Transfer Case)', async ({api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    console.log('createClaimWithRepresentedRespondent');
    await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmountJudge);
    console.log('amendClaimDocuments');
    await api.amendClaimDocuments(config.applicantSolicitorUser);
    console.log('notifyClaim');
    await api.notifyClaim(config.applicantSolicitorUser);
    console.log('notifyClaimDetails');
    await api.notifyClaimDetails(config.applicantSolicitorUser);
    console.log('defendantResponse');
    await api.defendantResponse(config.defendantSolicitorUser, mpScenario, null, 'FAST_CLAIM');
    console.log('claimantResponse');
    await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
    console.log('notSuitableForSdo-transferCase');
    await api.transferCase(judgeUser);
  }
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
