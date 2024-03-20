const config = require('../../../config.js');
// To use on local because the idam images are different
// const judgeUser = config.judgeUserWithRegionId1Local;
// const hearingCenterAdminToBeUsed = config.hearingCenterAdminLocal;
const judgeUser = config.testEarlyAdopterCourts ? config.judgeUser2WithRegionId2 : config.judgeUserWithRegionId1;
const hearingCenterAdminToBeUsed = config.testEarlyAdopterCourts ? config.hearingCenterAdminWithRegionId2 : config.hearingCenterAdminWithRegionId1;


const mpScenario1v1 = 'ONE_V_ONE';

async function prepareClaimSpec(api_spec) {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE', true);
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE',
    'AWAITING_APPLICANT_INTENTION');
}

Feature('Create SDO SmallTrack- Flight Delay - 1v1 - spec @api-specified @api-nonprod');
Scenario('1v1 full defence unspecified - judge draws small claims WITHOUT sum of damages - flight delay', async ({api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaimSpec(api_spec);
    await api_spec.createSDO(judgeUser, 'CREATE_SMALL');
    await api_spec.evidenceUploadApplicant(config.applicantSolicitorUser, mpScenario1v1);
    await api_spec.evidenceUploadRespondent(config.defendantSolicitorUser, mpScenario1v1);
    await api_spec.scheduleHearing(hearingCenterAdminToBeUsed, 'SMALL_CLAIMS');
    await api_spec.amendHearingDueDate(config.systemupdate);
    await api_spec.hearingFeePaidFlightDelay(hearingCenterAdminToBeUsed);
    if (['demo'].includes(config.runningEnv)) {
      await api_spec.triggerBundle(config.systemupdate);
    }
    //await api_spec.createFinalOrderJO(judgeUser, 'FREE_FORM_ORDER');
  }
});

AfterSuite(async ({api_spec_small}) => {
  await api_spec_small.cleanUp();
});
