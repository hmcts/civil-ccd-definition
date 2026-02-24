/* eslint-disable no-unused-vars */
const config = require('../../config.js');
const mpScenario = 'ONE_V_ONE';

let civilCaseReference;

Feature('Smoke test - create claim and create general application').tag('@smoke-api');

Scenario('Judge makes decision 1V1 - AWAITING_ADDITIONAL_INFORMATION', async ({api_ga}) => {
  civilCaseReference = await api_ga.createSpecifiedClaim(config.applicantSolicitorUser, mpScenario);
  await api_ga.initiateGeneralApplication(config.applicantSolicitorUser, civilCaseReference);
}).retry(1);

AfterSuite(async ({api_ga}) => {
  await api_ga.cleanUp();
});