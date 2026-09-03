const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';

Feature('Smoke - 1v1 LiP unspec claim lifecycle CCD wiring').tag('@civil-service-smoke @api-cos');

// Service-owned lifecycle behaviour is covered by civil-service workflow integration tests.
// This scenario only verifies CCD event, state and environment wiring.
Scenario('Create and notify a claim with a LiP respondent through CCD', async ({api}) => {
  await api.createClaimWithRespondentLitigantInPerson(config.applicantSolicitorUser, mpScenario, false);
  await api.notifyClaimLip(config.applicantSolicitorUser, mpScenario, false);
  await api.notifyClaimDetailsLip(config.applicantSolicitorUser, mpScenario, false);
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
