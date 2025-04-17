

const config = require('../../../config.js');
const {APPLICANT_SOLICITOR_QUERY, RESPONDENT_SOLICITOR_QUERY} = require('../../../fixtures/queryTypes');
const {checkLRQueryManagementEnabled} = require('../../../api/testingSupport');
const mpScenario = 'TWO_V_ONE';
let isQueryManagementEnabled = false;

Feature('CCD 2v1 API test @api-unspec @api-multiparty @api-tests-2v1 @api-prod @api-nightly-prod @api-unspec-full-defence @QM');

Before(async () => {
  isQueryManagementEnabled = await checkLRQueryManagementEnabled();
});

Scenario('Create claim', async ({I, api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
});

Scenario('HMCTS admin adds a case note to case', async ({I, api}) => {
  await api.addCaseNote(config.adminUser);
});

Scenario('Amend claim documents', async ({I, api}) => {
  await api.amendClaimDocuments(config.applicantSolicitorUser);
});

Scenario('Notify claim', async ({I, api}) => {
  await api.notifyClaim(config.applicantSolicitorUser);
});

Scenario('Notify claim details', async ({I, api}) => {
  await api.notifyClaimDetails(config.applicantSolicitorUser);
});

Scenario('Amend party details', async ({I, api}) => {
  await api.amendPartyDetails(config.adminUser);
});

Scenario('Acknowledge claim', async ({I, api}) => {
  await api.acknowledgeClaim(config.defendantSolicitorUser, mpScenario);
});

Scenario('Inform agreed extension date', async ({I, api}) => {
  await api.informAgreedExtension(config.defendantSolicitorUser, mpScenario);
});

Scenario('Defendant response', async ({I, api}) => {
  await api.defendantResponse(config.defendantSolicitorUser, 'TWO_V_ONE');
});

Scenario('Claimant response', async ({I, api}) => {
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
});

Scenario('Claimant queries', async ({api, qmSteps}) => {
  if (isQueryManagementEnabled) {
    const caseId = await api.getCaseId();
    const applicantSolicitorQuery = await qmSteps.raiseQuery(caseId, config.applicantSolicitorUser, APPLICANT_SOLICITOR_QUERY);
    await qmSteps.respondToQuery(caseId, config.hearingCenterAdminWithRegionId1, applicantSolicitorQuery, APPLICANT_SOLICITOR_QUERY);
    await qmSteps.followUpOnQuery(caseId, config.applicantSolicitorUser, applicantSolicitorQuery, APPLICANT_SOLICITOR_QUERY);
  }
});

Scenario('Defendant queries', async ({api, qmSteps}) => {
  if (isQueryManagementEnabled) {
    const caseId = await api.getCaseId();
    const defendantSolicitorQuery = await qmSteps.raiseQuery(caseId, config.defendantSolicitorUser, RESPONDENT_SOLICITOR_QUERY);
    await qmSteps.respondToQuery(caseId, config.hearingCenterAdminWithRegionId1, defendantSolicitorQuery, RESPONDENT_SOLICITOR_QUERY);
    await qmSteps.followUpOnQuery(caseId, config.defendantSolicitorUser, defendantSolicitorQuery, RESPONDENT_SOLICITOR_QUERY);
  }
});

Scenario('Add case flags', async ({api}) => {
  await api.createCaseFlags(config.hearingCenterAdminWithRegionId1);
});

Scenario('Manage case flags', async ({api}) => {
  await api.manageCaseFlags(config.hearingCenterAdminWithRegionId1);
});

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
