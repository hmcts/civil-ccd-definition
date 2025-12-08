const config = require('../../../config.js');
const {getSupportWorkerFlag, getDetainedIndividualFlag, getDisruptiveIndividualFlag
} = require('../../../api/caseFlagsHelper');
const {PUBLIC_QUERY} = require('../../../fixtures/queryTypes');
const {respondToQueryCTSCTask} = require('../../../fixtures/wa/respondToQueryTasks');

const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';
const fastClaimAmount = '11000';
const serviceId = 'AAA7';
const hmcTest = true;
let caseId;
let isQueryManagementEnabled = false;

Feature('CCD 1v2 Unspec fast hearings API test').tag('@api-hearings @api-nonprod @api-prod @wa-task');

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

Scenario('Claimant queries', async ({ api, qmSteps }) => {
  const caseId = await api.getCaseId();
  if (isQueryManagementEnabled) {
    let query = await qmSteps.raiseLRQuery(caseId, config.applicantSolicitorUser, PUBLIC_QUERY, false);
    await qmSteps.validateQmResponseTask(caseId, config.ctscAdminUser, respondToQueryCTSCTask(query.id), query.id);
    await qmSteps.respondToQuery(caseId, config.ctscAdminUser, query, PUBLIC_QUERY);
    query = await qmSteps.followUpOnLRQuery(caseId, config.applicantSolicitorUser, query, PUBLIC_QUERY);
    await qmSteps.validateQmResponseTask(caseId, config.ctscAdminUser, respondToQueryCTSCTask(query.id), query.id);
  }
});

Scenario('Defendant 1 solicitor queries', async ({ api, qmSteps }) => {
  const caseId = await api.getCaseId();
  if (isQueryManagementEnabled) {
    let query = await qmSteps.raiseLRQuery(caseId, config.defendantSolicitorUser, PUBLIC_QUERY, false);
    await qmSteps.validateQmResponseTask(caseId, config.ctscAdminUser, respondToQueryCTSCTask(query.id), query.id);
    await qmSteps.respondToQuery(caseId, config.ctscAdminUser, query, PUBLIC_QUERY);
    query = await qmSteps.followUpOnLRQuery(caseId, config.defendantSolicitorUser, query, PUBLIC_QUERY);
    await qmSteps.validateQmResponseTask(caseId, config.ctscAdminUser, respondToQueryCTSCTask(query.id), query.id);
  }
});

Scenario('Defendant 2 solicitor queries', async ({ api, qmSteps }) => {
  const caseId = await api.getCaseId();
  if (isQueryManagementEnabled) {
    let query = await qmSteps.raiseLRQuery(caseId, config.secondDefendantSolicitorUser, PUBLIC_QUERY, false);
    await qmSteps.validateQmResponseTask(caseId, config.ctscAdminUser, respondToQueryCTSCTask(query.id), query.id);
    await qmSteps.respondToQuery(caseId, config.ctscAdminUser, query, PUBLIC_QUERY);
    query = await qmSteps.followUpOnLRQuery(caseId, config.secondDefendantSolicitorUser, query, PUBLIC_QUERY);
    await qmSteps.validateQmResponseTask(caseId, config.ctscAdminUser, respondToQueryCTSCTask(query.id), query.id);
  }
});

Scenario('Judge choose hearing in person', async ({api}) => {
  await api.createSDO(config.judgeUser2WithRegionId2, 'CREATE_FAST_IN_PERSON');
});

Scenario('Hearing centre admin requests a hearing', async ({hearings}) => {
  await hearings.generateHearingsPayload(config.hearingCenterAdminWithRegionId2, caseId, serviceId);
});
