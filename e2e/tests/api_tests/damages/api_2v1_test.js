

const config = require('../../../config.js');
const {PUBLIC_QUERY} = require('../../../fixtures/queryTypes');
const mpScenario = 'TWO_V_ONE';

Feature('Unspec 2v1 api journey').tag('@api-nightly-prod @api-unspec-full-defence');

Scenario('01 Create claim', async ({I, api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
});

Scenario('02 HMCTS admin adds a case note to case', async ({I, api}) => {
  await api.addCaseNote(config.adminUser);
});

Scenario('03 Amend claim documents', async ({I, api}) => {
  await api.amendClaimDocuments(config.applicantSolicitorUser);
});

Scenario('04 Notify claim', async ({I, api}) => {
  await api.notifyClaim(config.applicantSolicitorUser);
});

Scenario('05 Notify claim details', async ({I, api}) => {
  await api.notifyClaimDetails(config.applicantSolicitorUser);
});

Scenario('06 Amend party details', async ({I, api}) => {
  await api.amendPartyDetails(config.adminUser);
});

Scenario('07 Acknowledge claim', async ({I, api}) => {
  await api.acknowledgeClaim(config.defendantSolicitorUser, mpScenario);
});

Scenario('08 Inform agreed extension date', async ({I, api}) => {
  await api.informAgreedExtension(config.defendantSolicitorUser, mpScenario);
});

Scenario('09 Defendant response', async ({I, api}) => {
  await api.defendantResponse(config.defendantSolicitorUser, 'TWO_V_ONE');
});

Scenario('10 Claimant response', async ({I, api}) => {
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
});

Scenario('11 Claimant queries', async ({ api, qmSteps }) => {
  const caseId = await api.getCaseId();
  const query = await qmSteps.raiseLRQuery(caseId, config.applicantSolicitorUser, PUBLIC_QUERY, true);
  await qmSteps.respondToQuery(caseId, config.hearingCenterAdminWithRegionId1, query, PUBLIC_QUERY);
  await qmSteps.followUpOnLRQuery(caseId, config.applicantSolicitorUser, query, PUBLIC_QUERY);
});

Scenario('12 Defendant queries', async ({ api, qmSteps }) => {
  const caseId = await api.getCaseId();
  const query = await qmSteps.raiseLRQuery(caseId, config.defendantSolicitorUser, PUBLIC_QUERY, true);
  await qmSteps.respondToQuery(caseId, config.hearingCenterAdminWithRegionId1, query, PUBLIC_QUERY);
  await qmSteps.followUpOnLRQuery(caseId, config.defendantSolicitorUser, query, PUBLIC_QUERY);
});

Scenario('13 Add case flags', async ({api}) => {
  await api.createCaseFlags(config.hearingCenterAdminWithRegionId1);
});

Scenario('14 Manage case flags', async ({api}) => {
  await api.manageCaseFlags(config.hearingCenterAdminWithRegionId1);
});

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
