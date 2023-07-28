/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';

Feature('Bulk claim 1vs1 SDT user API test @api-bulk');

Scenario('Create claim via civil orchestrator service', async ({api}) => {
  // this will be replaced with a new steps file called steps_bulk
  // that should have a method for making an api request to new civil orchestrator
  // have added the url in the config.js as orchestratorService which needs to be used
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
});

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
