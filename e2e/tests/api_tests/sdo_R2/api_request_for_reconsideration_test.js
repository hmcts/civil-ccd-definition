const config = require('../../../config.js');
const legalAdvUser = config.tribunalCaseworkerWithRegionId4;
// To use on local because the idam images are different
//const judgeUser = config.judgeUserWithRegionId1Local;
const judgeUser = config.judgeUser2WithRegionId4;

async function prepareClaimSpec(api_spec_small) {
await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
await api_spec_small.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE', true);
await api_spec_small.claimantResponse(config.applicantSolicitorUser, true);
}

Feature('Request for reconsideration - 1v1 - spec @api-spec-1v1 @api-nonprod');

Scenario('1v1 spec request for reconsideration for uphold previous order', async ({api_spec_small}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimSpec(api_spec_small);
    await api_spec_small.createSDO(legalAdvUser, 'CREATE_SMALL_NO_SUM');
    await api_spec_small.requestForReconsideration(config.defendantSolicitorUser);
    await api_spec_small.judgeDecisionOnReconsiderationRequest(judgeUser, 'YES');
  }
});

Scenario('1v1 spec request for reconsideration for create new SDO', async ({api_spec_small}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimSpec(api_spec_small);
    await api_spec_small.createSDO(legalAdvUser, 'CREATE_SMALL_NO_SUM');
    await api_spec_small.requestForReconsideration(config.defendantSolicitorUser);
    await api_spec_small.judgeDecisionOnReconsiderationRequest(judgeUser, 'CREATE_SDO');
  }
});

Scenario('1v1 spec request for reconsideration for create general order', async ({api_spec_small}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimSpec(api_spec_small);
    await api_spec_small.createSDO(legalAdvUser, 'CREATE_SMALL_NO_SUM');
    await api_spec_small.requestForReconsideration(config.defendantSolicitorUser);
    await api_spec_small.judgeDecisionOnReconsiderationRequest(judgeUser, 'CREATE_GENERAL_ORDER');
  }
});

AfterSuite(async ({api_spec_small}) => {
  await api_spec_small.cleanUp();
});
