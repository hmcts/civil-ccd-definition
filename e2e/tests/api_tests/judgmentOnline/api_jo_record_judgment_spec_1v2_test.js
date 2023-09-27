/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_TWO';
const judgeUser = config.judgeUserWithRegionId1;
const legalAdvUser = config.tribunalCaseworkerWithRegionId4;
// to use on local because the idam images are different
// const judgeUser = config.judgeUserWithRegionId1Local;
// const legalAdvUser = config.tribunalCaseworkerWithRegionId1Local;

Feature('Record Judgment 1v2 API test spec @api-spec-1v2 @api-jo @api-non-prod-jo');

Scenario('Record Judgment Spec claim 1v2', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
    await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', mpScenario);
    await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', mpScenario,
      'JUDICIAL_REFERRAL');
    await api_spec.createFinalOrderJO(judgeUser, 'FREE_FORM_ORDER');
    await api_spec.recordJudgment(legalAdvUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_IN_INSTALMENTS');
  }
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
