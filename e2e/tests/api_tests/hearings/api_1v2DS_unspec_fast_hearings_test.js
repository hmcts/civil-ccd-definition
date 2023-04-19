const config = require('../../../config.js');
const {getSupportWorkerFlag, getDetainedIndividualFlag,
  getDisruptiveIndividualFlag
} = require('../../../api/caseFlagsHelper');

const mpScenario = 'ONE_V_ONE';
let caseId;

Feature('CCD 1v1 Unspec small hearings API test @non-prod-e2e-ft @api-hearings-unspec @api-hearings');

Scenario('1v2DS full defence defendant and claimant response', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, '11000');
  await api.notifyClaim(config.applicantSolicitorUser);
  // await api.notifyClaim(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario);
  // await api.defendantResponse(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  // await api.defendantResponse(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO');

  caseId = await api.getCaseId();
});

Scenario('Listing officer adds case flags', async ({hearings}) => {
  await hearings.createCaseFlags(config.hearingCenterAdminWithRegionId1, caseId, 'respondent1', getDetainedIndividualFlag());
  await hearings.createCaseFlags(config.hearingCenterAdminWithRegionId1, caseId, 'respondent1', getDisruptiveIndividualFlag());
  await hearings.createCaseFlags(config.hearingCenterAdminWithRegionId1, caseId, 'respondent2Witnesses', getSupportWorkerFlag());
});

Scenario('Judge choose hearing in person', async ({api}) => {
  await api.createSDO(config.judgeUserWithRegionId1, 'CREATE_FAST');
});

Scenario('Hearing centre admin requests a hearing', async ({hearings}) => {
  await hearings.generateHearingsPayload(config.hearingCenterAdminWithRegionId1, caseId, 'AAA7');
});
