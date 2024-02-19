const config = require('../../../config.js');
const legalAdvUser = config.tribunalCaseworkerWithRegionId4;
// To use on local because the idam images are different
const judgeUser = config.judgeUserWithRegionId1Local;
//const judgeUser = config.judgeUser2WithRegionId4;

async function prepareClaimSpec(api_spec_small) {
await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
await api_spec_small.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE', true);
await api_spec_small.claimantResponse(config.applicantSolicitorUser, true);
}

Feature('Create SDO SmallTrack- Flight Delay - 1v1 - spec @api-specified @api-nonprod');
Scenario('1v1 full defence unspecified - judge draws small claims WITHOUT sum of damages - flight delay', async ({api_spec_small}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimSpec(api_spec_small);
    await api_spec_small.createSDO(judgeUser, 'CREATE_SMALL_FLIGHT_DELAY_NO_SUM');
  }
});

AfterSuite(async ({api_spec_small, api_spec}) => {
  await api_spec_small.cleanUp();
  await api_spec.cleanUp();
});
