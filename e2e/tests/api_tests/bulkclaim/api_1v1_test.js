/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';

Feature('Bulk claim 1v1 SDT user API test @api-bulk');

/* Scenario('1v1 with No interest - Create claim via SDT', async ({bulks}) => {
    await bulks.createClaimFromSDTRequest(config.applicantSolicitorUser, mpScenario, false);
}); */

Scenario('1v1 with no interest - Submit a new claim as a caseworker', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api_spec.createNewClaimWithCaseworker(config.applicantSolicitorUser, 'ONE_V_ONE');
    //await api_spec.createNewClaimWithCaseworker(config.applicantSolicitorUser, 'ONE_V_TWO');
  }
});

Scenario('1v1 with No interest - Create claim via SDT - Postcode Negative Validation', async ({bulks}) => {
  await bulks.createClaimFromSDTRequestForPostCodeNegative(config.applicantSolicitorUserForBulkClaim, mpScenario, false);
});

Scenario('1v1 with No interest - Create claim via SDT - Postcode Positive Validation', async ({bulks}) => {
  await bulks.createClaimFromSDTRequestForPostCodePositive(config.applicantSolicitorUserForBulkClaim, mpScenario, false);
});

Scenario('1v1 with No interest - Create claim via SDT - Duplicate case check call', async ({bulks}) => {
  await bulks.createClaimFromSDTRequestForDuplicateCaseCheckCall(config.applicantSolicitorUserForBulkClaim, mpScenario, false);
});

AfterSuite(async ({api}) => {
    await api.cleanUp();
});
