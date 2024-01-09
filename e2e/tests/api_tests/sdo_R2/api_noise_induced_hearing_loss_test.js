const config = require('../../../config.js');

const mpScenario1v1 = 'ONE_V_ONE';
const mpScenario1v1Nihl = 'ONE_V_ONE_NIHL';
const judgeUser = config.testEarlyAdopterCourts ? config.judgeUser2WithRegionId2 : config.judgeUserWithRegionId1;
// To use on local because the idam images are different
// const legalAdvUser = config.judgeUserWithRegionId1Local;
const claimAmount = '11000';

Feature('Noise Induced Hearing Loss API test - fast claim - unspec @api-unspec @api-tests-1v1 @api-nonprod');

async function prepareClaim(api) {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario1v1Nihl, claimAmount);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario1v1, null, 'FAST_CLAIM_NIHL');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario1v1, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
}

Scenario('1v1 unspec create SDO for Noise Induced Hearing Loss', async ({api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api);
    await api.createSDO(judgeUser, 'CREATE_FAST');
  }
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
