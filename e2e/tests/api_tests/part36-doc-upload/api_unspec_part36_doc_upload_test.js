const config = require('../../../config.js');
const intermediateTrackClaimAmount = '99000';
const mintiEnabled = true;
const track = 'INTERMEDIATE_CLAIM';
const judgeUser = config.judgeUserWithRegionId1;

Feature('1v1 unspec upload Part 36 document')
  .tag('@civil-service-pr @api-part36-upload');

Scenario('1v1 Create Unspecified claim and upload part36 document as applicant', async ({api}) => {
  const mpScenario = 'ONE_V_ONE';
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, intermediateTrackClaimAmount, mintiEnabled);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, null, track);
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'JUDICIAL_REFERRAL', 'FOR_SDO', track);
  await api.createFinalOrder(judgeUser, 'DOWNLOAD_ORDER_TEMPLATE', 'INTERMEDIATE');
  await api.part36UploadApplicant(config.applicantSolicitorUser, mpScenario);
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
