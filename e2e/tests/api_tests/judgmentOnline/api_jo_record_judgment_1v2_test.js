const config = require('../../../config.js');

const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';
const judgeUser = config.judgeUserWithRegionId1;
// const legalAdvUser = config.tribunalCaseworkerWithRegionId4;
// to use on local because the idam images are different
// const judgeUser = config.judgeUserWithRegionId1Local;
const legalAdvUser = config.tribunalCaseworkerWithRegionId1Local; //TODO change to tribunalCaseworkerWithRegionId4 ???
const claimAmountJudge = '11000';

Feature('Record Judgment 1v2 API test unspec @api-unspec @api-tests-1v2 @api-jo @api-non-prod-jo');

async function prepareClaim(api, claimAmount) {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmount);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.defendantResponse(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
  await api.createFinalOrderJO(judgeUser, 'FREE_FORM_ORDER');
}

Scenario('1v2 full defence unspecified - caseworker records judgment (Det.of means - pay instalments) @api-unspec @api-tests-1v2 @api-jo @api-non-prod-jo', async ({I, api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountJudge);
    await api.recordJudgment(legalAdvUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_IN_INSTALMENTS');
  }
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
