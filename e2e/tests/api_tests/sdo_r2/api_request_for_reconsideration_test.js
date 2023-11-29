const config = require('../../../config.js');

const mpScenario1v1 = 'ONE_V_ONE';
const mpScenario1v2Spec = 'ONE_V_TWO';
const mpScenario1v2 = 'ONE_V_TWO_TWO_LEGAL_REP';
const judgeUser = config.judgeUserWithRegionId1;
// To use on local because the idam images are different
// const judgeUser = config.judgeUserWithRegionId1Local;
const fastClaimAmount = '11000';

Feature('Request for reconsideration Case 1v1 API test - fast claim - unspec @api-unspec @api-tests-1v1 @api-nonprod');

async function prepareClaim(api) {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario1v1, fastClaimAmount);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario1v1, null, 'SMALL_CLAIMS');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario1v1, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
}

async function prepareClaimSpec(api_spec) {
await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', mpScenario1v2Spec);
await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO',
  'JUDICIAL_REFERRAL');
}

Scenario('1v1 request for reconsideration', async ({api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api);
    await api.createSDO(judgeUser, 'CREATE_FAST');
    await api.requestForReconsideration(config.applicantSolicitorUser);
  }
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});

Feature('Request for reconsideration - 1v2 - spec @api-spec-1v2 @api-nonprod');

Scenario('1v2 request for reconsiderationo )', async ({api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimSpec(api_spec);
    await api_spec.createSDO(judgeUser, 'CREATE_FAST');
    await api_spec.requestForReconsideration(config.defendantSolicitorUser);
  }
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
