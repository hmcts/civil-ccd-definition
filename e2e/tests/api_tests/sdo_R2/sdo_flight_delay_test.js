const config = require('../../../config.js');
// To use on local because the idam images are different
// const judgeUser = config.judgeUserWithRegionId1Local;
// const hearingCenterAdminToBeUsed = config.hearingCenterAdminLocal;
const judgeUser = config.judgeUser2WithRegionId4; //small claim specified goes to region4 judge
const hearingCenterAdminToBeUsed = config.hearingCenterAdminWithRegionId4;
const mpScenario = 'ONE_V_ONE_FLIGHT_DELAY';
const mpScenario1v1 = 'ONE_V_ONE';
const claimAmountSmallTrack = '1500';

async function prepareClaim(api_spec, claimAmount) {
  await api_spec.createClaimSpecFlightDelay(config.applicantSolicitorUser, mpScenario, claimAmount);
  await api_spec.defendantResponse(config.defendantSolicitorUser);
  await api_spec.claimantResponseForFlightDelay(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE', 'AWAITING_APPLICANT_INTENTION');
}

async function prepareClaimOtherOption(api_spec, claimAmount) {
  await api_spec.createClaimSpecFlightDelay(config.applicantSolicitorUser, 'ONE_V_ONE_FLIGHT_DELAY_OTHER', claimAmount);
  await api_spec.defendantResponse(config.defendantSolicitorUser);
  await api_spec.claimantResponseForFlightDelay(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE', 'AWAITING_APPLICANT_INTENTION');
}

Feature('Create SDO SmallTrack- Flight Delay - 1v1 - spec @api-specified @api-prod  @api-r2-sdo');

Scenario('1v1 full defence unspecified - judge draws small claims WITHOUT sum of damages - flight delay @api-r2-sdo', async ({api_spec}) => {
  await prepareClaim(api_spec, claimAmountSmallTrack);
  await api_spec.createSDO(judgeUser, 'CREATE_SMALL');
});

Scenario('1v1 specified - flight delay other option Small-claim @api-spec-full-defence', async ({api_spec}) => {
    await prepareClaimOtherOption(api_spec, claimAmountSmallTrack);
});

AfterSuite(async ({api_spec}) => {
  await api_spec.cleanUp();
});
