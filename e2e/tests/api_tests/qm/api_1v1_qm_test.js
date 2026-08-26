// Smoke: single create-respond cycle validates cross-service CCD event routing.
// Full lifecycle and role-based behaviour is covered by civil-service integration tests.
const config = require('../../../config.js');
const {PUBLIC_QUERY} = require('../../../fixtures/queryTypes');
const mpScenario = 'ONE_V_ONE';

Feature('1v1 query management api smoke').tag('@civil-service-nightly');

Scenario('01 Prepare claim', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario);
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO');
}).retry(1);

Scenario('02 Claimant raise and respond smoke', async ({ api, qmSteps }) => {
  const caseId = await api.getCaseId();
  const query = await qmSteps.raiseLRQuery(caseId, config.applicantSolicitorUser, PUBLIC_QUERY, false);
  await qmSteps.respondToQuery(caseId, config.ctscAdminUser, query, PUBLIC_QUERY);
});

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});