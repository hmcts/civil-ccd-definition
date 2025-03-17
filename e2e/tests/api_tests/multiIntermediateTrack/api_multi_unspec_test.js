const config = require('../../../config.js');
const multiTrackClaimAmount = '200001';
const mintiEnabled = true;
const track = 'MULTI_CLAIM';
const judgeUser = config.judgeUserWithRegionId1;
const hearingCenterAdminToBeUsed = config.hearingCenterAdminWithRegionId1;
let caseId, taskId, intermediateTrackOrderMadeReviewCaseExpectedTask, multiTrackDirectionsExpectedTask;


Feature('CCD API test unspec multi track @api-unspec-multi-intermediate');

async function prepareClaim(api, mpScenario, claimAmount) {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmount, mintiEnabled);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await defendantResponse(api, mpScenario);
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', track);
  caseId = await api.getCaseId();
  await api.createFinalOrder(judgeUser, 'DOWNLOAD_ORDER_TEMPLATE', 'MULTI');
  await api.evidenceUploadApplicant(config.applicantSolicitorUser, mpScenario);
  await api.scheduleHearing(hearingCenterAdminToBeUsed, 'FAST_TRACK_TRIAL', true);
}

Scenario('1v1 Create Unspecified Multi Track claim @api-prod', async ({api}) => {
  const mpScenario = 'ONE_V_ONE';
  await prepareClaim(api, mpScenario, multiTrackClaimAmount);
});

Scenario('1v2 Different Solicitors Create Unspecified Multi Track claim ', async ({ api }) => {
  const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';
  await prepareClaim(api, mpScenario, multiTrackClaimAmount);
});

Scenario('1v2 Same Solicitor Create Unspecified Multi Track claim', async ({ api }) => {
  const mpScenario = 'ONE_V_TWO_ONE_LEGAL_REP';
  await prepareClaim(api, mpScenario, multiTrackClaimAmount);
});

Scenario('2v1 Create Unspecified Multi Track claim @api-nonprod', async ({ api, WA }) => {
  const mpScenario = 'TWO_V_ONE';
  await prepareClaim(api, mpScenario, multiTrackClaimAmount, WA);
});

async function defendantResponse(api, mpScenario) {
  if (mpScenario === 'ONE_V_TWO_TWO_LEGAL_REP') {
    await api.defendantResponse(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
    await api.defendantResponse(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
  } else {
    await api.defendantResponse(config.defendantSolicitorUser, mpScenario);
  }
}

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
