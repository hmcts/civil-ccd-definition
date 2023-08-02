/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';

Feature('Bulk claim 1vs1 SDT user API test @api-bulk');

Scenario('Create claim via civil orchestrator service', async ({bulks}) => {
  await bulks.createClaimFromSDTRequest(config.applicantSolicitorUser);
});

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
