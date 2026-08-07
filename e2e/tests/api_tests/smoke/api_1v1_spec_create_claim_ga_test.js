 
const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';

let civilCaseReference, gaCaseReference;

Feature('Smoke - GA lifecycle CCD wiring').tag('@civil-service-smoke');

// Service-owned GA transformations, responses and state decisions are covered by civil-service
// workflow integration tests. This scenario verifies the main parent/child CCD and role wiring.
Scenario('Create, respond to and decide a GA through CCD', async ({api_ga}) => {
  civilCaseReference = await api_ga.createSpecifiedClaim(config.applicantSolicitorUser, mpScenario);
  gaCaseReference = await api_ga.initiateGeneralApplication(config.applicantSolicitorUser, civilCaseReference);
  await api_ga.respondentResponse(config.defendantSolicitorUser, gaCaseReference);
  await api_ga.judgeMakesDecisionApplicationDismiss(config.judgeUser2WithRegionId2, gaCaseReference);
}).retry(1);

AfterSuite(async ({api_ga}) => {
  await api_ga.cleanUp();
});
