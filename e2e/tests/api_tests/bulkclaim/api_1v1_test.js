/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';

Feature('Bulk claim 1v1 SDT user API test @api-bulk');

Scenario('1v1 with No interest - Create claim via SDT', async ({bulks}) => {
    await bulks.createClaimFromSDTRequest(config.applicantSolicitorUser, mpScenario, false);
});

AfterSuite(async ({api}) => {
    await api.cleanUp();
});
