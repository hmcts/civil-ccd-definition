const config = require('../../../config.js');

const mpScenario1v1 = 'ONE_V_ONE';
const mpScenario1v2Spec = 'ONE_V_TWO';
const mpScenario1v2 = 'ONE_V_TWO_TWO_LEGAL_REP';
const judgeUser = config.judgeUserWithRegionId1;
// To use on local because the idam images are different
// const judgeUser = config.judgeUserWithRegionId1Local;
const fastClaimAmount = '11000';

Feature('Transfer Online Case 1v1 API test - fast claim - unspec @api-unspec @api-tests-1v1 @api-nonprod');

async function prepareClaim(api) {
  console.log('createClaimWithRepresentedRespondent');
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario1v1, fastClaimAmount);
  console.log('amendClaimDocuments');
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  console.log('notifyClaim');
  await api.notifyClaim(config.applicantSolicitorUser);
  console.log('notifyClaimDetails');
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  console.log('defendantResponse');
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario1v1, null, 'SMALL_CLAIMS');
  console.log('claimantResponse');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario1v1, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
}

async function prepareClaimSpec(api_spec) {
console.log('--createClaimWithRepresentedRespondent--');
await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
console.log('--defendantResponse--');
await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', mpScenario1v2Spec);
console.log('--claimantResponse--');
await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO',
  'JUDICIAL_REFERRAL');
}

Scenario('1v1 full defence unspecified - judge user - not suitable SDO - Transfer Case)', async ({api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api);
    console.log('notSuitableForSdo-transferCase');
    await api.transferCase(judgeUser, 'CHANGE_LOCATION');
  }
});

Scenario('1v1 full defence unspecified - judge user - not suitable SDO - Other reasons)', async ({api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api);
    console.log('notSuitableForSdo-otherReasons');
    await api.transferCase(judgeUser, 'OTHER_REASONS');
  }
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});

Feature('Transfer Online Case 1v2 API test - fast claim - unspec @api-unspec @api-tests-1v2SS @api-nonprod');

Scenario('1v2 full defence unspecified - judge user - not suitable SDO - Transfer Case)', async ({api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    console.log('--createClaimWithRepresentedRespondent--');
    await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario1v2, fastClaimAmount);
    console.log('--amendClaimDocuments--');
    await api.amendClaimDocuments(config.applicantSolicitorUser);
    console.log('--notifyClaim--');
    await api.notifyClaim(config.applicantSolicitorUser, mpScenario1v2);
    console.log('--notifyClaimDetails--');
    await api.notifyClaimDetails(config.applicantSolicitorUser);
    console.log('--defendantResponse--');
    await api.defendantResponse(config.defendantSolicitorUser, mpScenario1v2, 'solicitorOne');
    console.log('--defendantResponse two--');
    await api.defendantResponse(config.secondDefendantSolicitorUser, mpScenario1v2, 'solicitorTwo');
    console.log('--claimantResponse--');
    await api.claimantResponse(config.applicantSolicitorUser, mpScenario1v2, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
    console.log('notSuitableForSdo-transferCase');
    await api.transferCase(judgeUser, 'CHANGE_LOCATION');
  }
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});

Feature('Transfer Online Case 1v2 API test - small claim - spec @api-spec-1v2 @api-nonprod');

Scenario('Transfer Online Spec claim 1v2 - judge user - not suitable SDO - Transfer Case', async ({api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimSpec(api_spec);
    console.log('notSuitableForSdo-transferCase');
    await api_spec.transferCase(judgeUser, 'CHANGE_LOCATION');
  }
});

Scenario('Transfer Online Spec claim 1v2 - judge user - not suitable SDO - Other reasons', async ({api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimSpec(api_spec);
    console.log('notSuitableForSdo-otherReasons');
    await api_spec.transferCase(judgeUser, 'OTHER_REASONS');
  }
});

AfterSuite(async ({api_spec}) => {
  await api_spec.cleanUp();
});
