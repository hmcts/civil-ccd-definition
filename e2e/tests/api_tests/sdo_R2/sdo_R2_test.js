const config = require('../../../config.js');

const mpScenario = 'ONE_V_ONE_FLIGHT_DELAY';
const judgeUser = config.judgeUserWithRegionId1;
const claimAmountJudge = '11000';

Feature('CCD 1v1 API test flight delay claim @api-tests-1v1 @api-nonprod');

async function prepareClaim(api_spec, claimAmount) {
  await api_spec.createClaimSpecFlightDelay(config.applicantSolicitorUser, mpScenario, claimAmount);
  await api_spec.informAgreedExtensionDate(config.applicantSolicitorUser);
  await api_spec.defendantResponse(config.defendantSolicitorUser);
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE', 'AWAITING_APPLICANT_INTENTION');
}

Scenario.only('1v1 specified - flight delay claim', async ({api_spec}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
     await prepareClaim(api_spec, claimAmountJudge);
     // We should add
    // await api_spec.createSDO(judgeUser, 'CREATE_SMALL');
    // await api.evidenceUploadApplicant(config.applicantSolicitorUser);
    //  await api.evidenceUploadRespondent(config.defendantSolicitorUser, mpScenario);
    // await api.scheduleHearing(config.hearingCenterAdminWithRegionId1, 'SMALL_CLAIMS');
    // await api.amendHearingDueDate(config.systemupdate);
    // await api.hearingFeePaid(config.hearingCenterAdminWithRegionId1);
    // if (['demo'].includes(config.runningEnv)) {
    //   await api.triggerBundle(config.systemupdate);
    // }
    // await api.createFinalOrder(config.judgeUserWithRegionId1, 'FREE_FORM_ORDER');
  }
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
