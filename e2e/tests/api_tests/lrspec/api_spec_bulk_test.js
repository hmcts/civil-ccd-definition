/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD API test @submit-new-claim-as-caseworker @api-specified');

Scenario('Submit a new claim as a caseworker', async ({I, api_spec}) => {
  await api_spec.createNewClaimWithCaseworker(config.applicantSolicitorUser, 'ONE_V_ONE');
  await api_spec.createNewClaimWithCaseworker(config.applicantSolicitorUser, 'ONE_V_TWO');
});


AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});

