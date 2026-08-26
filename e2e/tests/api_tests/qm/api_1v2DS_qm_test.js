// Smoke: validates cross-party query routing with two defendant solicitors.
// Full lifecycle and role-based behaviour is covered by civil-service integration tests.
const config = require('../../../config.js');
const {PUBLIC_QUERY} = require('../../../fixtures/queryTypes');

const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';
const fastClaimAmount = '11000';
const hmcTest = true;
let caseId;

Feature('CCD 1v2DS query management api smoke').tag('@civil-service-nightly @api-qm');

Scenario('01 1v2DS full defence defendant and claimant response', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, fastClaimAmount, false, hmcTest);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.defendantResponse(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO');

  caseId = await api.getCaseId();
});

Scenario('02 Claimant raise and respond smoke', async ({ api, qmSteps }) => {
  const caseId = await api.getCaseId();
  const query = await qmSteps.raiseLRQuery(caseId, config.applicantSolicitorUser, PUBLIC_QUERY, false);
  await qmSteps.respondToQuery(caseId, config.ctscAdminUser, query, PUBLIC_QUERY);
});

Scenario('03 Defendant 2 raise and respond smoke', async ({ api, qmSteps }) => {
  const caseId = await api.getCaseId();
  const query = await qmSteps.raiseLRQuery(caseId, config.secondDefendantSolicitorUser, PUBLIC_QUERY, false);
  await qmSteps.respondToQuery(caseId, config.ctscAdminUser, query, PUBLIC_QUERY);
});

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});