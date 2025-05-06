const config = require('../../../config.js');
const {getSupportWorkerFlag, getDetainedIndividualFlag, getDisruptiveIndividualFlag
} = require('../../../api/caseFlagsHelper');
const {checkCaseFlagsAndHmcEnabled, checkLRQueryManagementEnabled} = require('../../../api/testingSupport');
const {
  APPLICANT_SOLICITOR_QUERY,
  RESPONDENT_SOLICITOR_1_QUERY,
  RESPONDENT_SOLICITOR_2_QUERY
} = require('../../../fixtures/queryTypes');
const {createAccount} = require('../../../api/idamHelper');
const {respondToQueryCTSCTask} = require('../../../fixtures/wa/respondToQueryTasks');

const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';
const fastClaimAmount = '11000';
const serviceId = 'AAA7';
const hmcTest = true;
let caseId;
let isQueryManagementEnabled = false;

Feature('CCD 1v2 Unspec fast hearings API test @api-hearings-unspec @api-hearings @api-nonprod @wa-task @QM');

Before(async () => {
  isQueryManagementEnabled = await checkLRQueryManagementEnabled();
});

Scenario('1v2DS full defence defendant and claimant response', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, fastClaimAmount, false, hmcTest);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.defendantResponse(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO');

  caseId = await api.getCaseId();
});

Scenario('Listing officer adds case flags', async ({hearings}) => {
  await hearings.createCaseFlags(config.hearingCenterAdminWithRegionId2, caseId, 'respondent1', getDetainedIndividualFlag());
  await hearings.createCaseFlags(config.hearingCenterAdminWithRegionId2, caseId, 'respondent1', getDisruptiveIndividualFlag());
  await hearings.createCaseFlags(config.hearingCenterAdminWithRegionId2, caseId, 'respondent2Witnesses', getSupportWorkerFlag());
});

Scenario('Claimant queries', async ({api, qmSteps}) => {
  if (isQueryManagementEnabled) {
    const caseId = await api.getCaseId();
    const claimantSolicitorQuery = await qmSteps.raiseQuery(caseId, config.applicantSolicitorUser, APPLICANT_SOLICITOR_QUERY, false);
    await qmSteps.validateQmResponseTask(caseId, config.ctscAdminUser, respondToQueryCTSCTask(claimantSolicitorQuery.id), claimantSolicitorQuery.id);
    await qmSteps.respondToQuery(caseId, config.ctscAdminUser, claimantSolicitorQuery, APPLICANT_SOLICITOR_QUERY);
    const claimantSolicitorFollowUp = await qmSteps.followUpOnQuery(caseId, config.applicantSolicitorUser, claimantSolicitorQuery, APPLICANT_SOLICITOR_QUERY);
    await qmSteps.validateQmResponseTask(caseId, config.ctscAdminUser, respondToQueryCTSCTask(claimantSolicitorFollowUp.id), claimantSolicitorFollowUp.id);
  }
});

Scenario('Defendant 1 solicitor queries', async ({api, qmSteps}) => {
  if (isQueryManagementEnabled) {
    const caseId = await api.getCaseId();
    const defendantSolicitorQuery = await qmSteps.raiseQuery(caseId, config.defendantSolicitorUser, RESPONDENT_SOLICITOR_1_QUERY, false);
    await qmSteps.validateQmResponseTask(caseId, config.ctscAdminUser, respondToQueryCTSCTask(defendantSolicitorQuery.id), defendantSolicitorQuery.id);
    await qmSteps.respondToQuery(caseId, config.ctscAdminUser, defendantSolicitorQuery, RESPONDENT_SOLICITOR_1_QUERY);
    const defendantSolicitorFollowUp = await qmSteps.followUpOnQuery(caseId, config.defendantSolicitorUser, defendantSolicitorQuery, RESPONDENT_SOLICITOR_1_QUERY);
    await qmSteps.validateQmResponseTask(caseId, config.ctscAdminUser, respondToQueryCTSCTask(defendantSolicitorFollowUp.id), defendantSolicitorFollowUp.id);
  }
});

Scenario('Defendant 2 solicitor queries', async ({api, qmSteps}) => {
  if (isQueryManagementEnabled) {
    const caseId = await api.getCaseId();
    const defendantSolicitorQuery = await qmSteps.raiseQuery(caseId, config.secondDefendantSolicitorUser, RESPONDENT_SOLICITOR_2_QUERY, false);
    await qmSteps.validateQmResponseTask(caseId, config.ctscAdminUser, respondToQueryCTSCTask(defendantSolicitorQuery.id), defendantSolicitorQuery.id);
    await qmSteps.respondToQuery(caseId, config.ctscAdminUser, defendantSolicitorQuery, RESPONDENT_SOLICITOR_2_QUERY);
    const defendantSolicitorFollowUp = await qmSteps.followUpOnQuery(caseId, config.secondDefendantSolicitorUser, defendantSolicitorQuery, RESPONDENT_SOLICITOR_2_QUERY);
    await qmSteps.validateQmResponseTask(caseId, config.ctscAdminUser, respondToQueryCTSCTask(defendantSolicitorFollowUp.id), defendantSolicitorFollowUp.id);
  }
});

Scenario('Judge choose hearing in person', async ({api}) => {
  await api.createSDO(config.judgeUser2WithRegionId2, 'CREATE_FAST_IN_PERSON');
});

Scenario('Hearing centre admin requests a hearing', async ({hearings}) => {
  await hearings.generateHearingsPayload(config.hearingCenterAdminWithRegionId2, caseId, serviceId);
});
