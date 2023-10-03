/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD API test @api-bulk');

Scenario('Submit a new bulk claim as a caseworker', async ({I, api_spec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api_spec.createNewClaimWithCaseworker(config.applicantSolicitorUser, 'ONE_V_ONE');
    await api_spec.createNewClaimWithCaseworker(config.applicantSolicitorUser, 'ONE_V_TWO');
  }
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});

