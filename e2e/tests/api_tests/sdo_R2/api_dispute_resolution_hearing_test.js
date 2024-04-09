const config = require('../../../config.js');

const mpScenario1v1 = 'ONE_V_ONE';
const judgeUser = config.testEarlyAdopterCourts ? config.judgeUser2WithRegionId2 : config.judgeUserWithRegionId1;
const hearingCenterAdminToBeUsed = config.testEarlyAdopterCourts ? config.hearingCenterAdminWithRegionId2 : config.hearingCenterAdminWithRegionId1;
// To use on local because the idam images are different
//const judgeUser = config.judgeUserWithRegionId1Local;
//const hearingCenterAdminToBeUsed = config.hearingCenterAdminLocal;
const claimAmount = '100';

Feature('Dispute resolution hearing API test - fast claim - unspec @api-unspec @api-tests-1v1 @api-nonprod');

async function prepareClaim(api) {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario1v1, claimAmount);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario1v1, null);
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario1v1, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO');
}

Scenario('1v1 unspec create SDO for DRH', async ({api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api);
    await api.createSDO(judgeUser, 'CREATE_SMALL_DRH');
    await api.evidenceUploadApplicant(config.applicantSolicitorUser, mpScenario1v1, 'DRH');
    await api.evidenceUploadRespondent(config.defendantSolicitorUser, mpScenario1v1, 'DRH');
    await api.scheduleHearing(hearingCenterAdminToBeUsed, 'SMALL_CLAIMS');
    await api.amendHearingDueDate(config.systemupdate);
    await api.hearingFeePaidDRH(hearingCenterAdminToBeUsed);
    if (['demo'].includes(config.runningEnv)) {
      await api.triggerBundle(config.systemupdate);
    }
    await api.createFinalOrderJO(judgeUser, 'FREE_FORM_ORDER');
  }
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
