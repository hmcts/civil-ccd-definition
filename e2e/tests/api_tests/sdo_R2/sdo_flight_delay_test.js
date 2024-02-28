const config = require('../../../config.js');
// To use on local because the idam images are different
// const judgeUser = config.judgeUserWithRegionId1Local;
// const hearingCenterAdminToBeUsed = config.hearingCenterAdminLocal;
const judgeUser = config.judgeUser2WithRegionId4;
const hearingCenterAdminToBeUsed = config.hearingCenterAdminWithRegionId4;


const mpScenario1v1 = 'ONE_V_ONE';

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
    /*await api_spec_small.evidenceUploadApplicant(config.applicantSolicitorUser, mpScenario1v1);
    await api_spec_small.evidenceUploadRespondent(config.defendantSolicitorUser, mpScenario1v1);
    await api_spec_small.scheduleHearing(hearingCenterAdminToBeUsed, 'SMALL_CLAIMS');
    await api_spec_small.amendHearingDueDate(config.systemupdate);
    await api_spec_small.hearingFeePaid(hearingCenterAdminToBeUsed);
    if (['demo'].includes(config.runningEnv)) {
      await api_spec_small.triggerBundle(config.systemupdate);
    }
    await api_spec_small.createFinalOrderJO(judgeUser, 'FREE_FORM_ORDER');*/
  }
});

AfterSuite(async ({api_spec_small}) => {
  await api_spec_small.cleanUp();
});
