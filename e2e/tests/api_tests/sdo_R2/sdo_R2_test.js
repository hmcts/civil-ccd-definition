const config = require('../../../config.js');

const mpScenario = 'ONE_V_ONE_FLIGHT_DELAY';
const claimAmountFastTrack = '11000';
const claimAmountSmallTrack = '9000';

Feature('CCD 1v1 API test flight delay claim @api-tests-1v1 @api-nonprod');

async function prepareClaim(api_spec, claimAmount) {
  await api_spec.createClaimSpecFlightDelay(config.applicantSolicitorUser, mpScenario, claimAmount);
  await api_spec.informAgreedExtensionDate(config.applicantSolicitorUser);
  await api_spec.defendantResponse(config.defendantSolicitorUser);
  await api_spec.claimantResponseForFlightDelay(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE', 'AWAITING_APPLICANT_INTENTION');
}

async function prepareClaimOtherOption(api_spec, claimAmount) {
  await api_spec.createClaimSpecFlightDelay(config.applicantSolicitorUser, 'ONE_V_ONE_FLIGHT_DELAY_OTHER', claimAmount);
  await api_spec.informAgreedExtensionDate(config.applicantSolicitorUser);
  await api_spec.defendantResponse(config.defendantSolicitorUser);
  await api_spec.claimantResponseForFlightDelay(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE', 'AWAITING_APPLICANT_INTENTION');
}

Scenario('1v1 specified - flight delay Small-claim', async ({api_spec}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
     await prepareClaim(api_spec, claimAmountSmallTrack);
  }
});

Scenario('1v1 specified - flight delay Fast-claim', async ({api_spec}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api_spec, claimAmountFastTrack);
  }
});

Scenario('1v1 specified - flight delay other option Small-claim', async ({api_spec}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimOtherOption(api_spec, claimAmountSmallTrack);
  }
});

Scenario('1v1 specified - flight delay other option Fast-claim', async ({api_spec}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimOtherOption(api_spec, claimAmountFastTrack);
  }
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
