/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD API test @api-spec-bulk-claim');

Scenario('Submit a new claim as a caseworker', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api_spec.createNewClaimWithCaseworker(config.applicantSolicitorUser, 'ONE_V_ONE');
    await api_spec.createNewClaimWithCaseworker(config.applicantSolicitorUser, 'ONE_V_TWO');
  }
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});

