/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';
let caseId;

Feature('Bulk claim 1vs1 SDT user API test @api-bulk @123');

Scenario('Create claim via civil orchestrator service', async ({api_spec, bulks}) => {
  await bulks.createClaimFromSDTRequest(config.applicantSolicitorUser);
  caseId = await api_spec.createNewClaimWithCaseworker(config.applicantSolicitorUser, 'ONE_V_ONE');
});

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
