const config = require('../../../config.js');

const mpScenario1v1 = 'ONE_V_ONE';
const legalAdvUser = config.tribunalCaseworkerWithRegionId4;
// To use on local because the idam images are different
// const judgeUser = config.judgeUserWithRegionId1Local;
const smallClaimAmount = '100';

Feature('Request for reconsideration Case 1v1 API test - fast claim - unspec @api-unspec @api-tests-1v1 @api-nonprod');

async function prepareClaim(api) {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario1v1, smallClaimAmount);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario1v1, null, 'SMALL_CLAIMS');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario1v1, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
}

async function prepareClaimSpec(api_spec_small) {
await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
await api_spec_small.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE', true);
await api_spec_small.claimantResponse(config.applicantSolicitorUser, true);
}

Scenario('1v1 unspec request for reconsideration', async ({api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api);
    await api.createSDO(legalAdvUser, 'CREATE_SMALL_NO_SUM');
    await api.requestForReconsideration(config.applicantSolicitorUser);
  }
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});

Feature('Request for reconsideration - 1v1 - spec @api-spec-1v1 @api-nonprod');

Scenario('1v1 spec request for reconsideration', async ({api_spec_small}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimSpec(api_spec_small);
    await api_spec_small.createSDO(legalAdvUser, 'CREATE_SMALL_NO_SUM');
    await api_spec_small.requestForReconsideration(config.defendantSolicitorUser);
  }
});

AfterSuite(async ({api_spec_small}) => {
  await api_spec_small.cleanUp();
});
