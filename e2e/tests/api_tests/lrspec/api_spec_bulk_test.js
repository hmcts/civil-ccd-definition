/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD API test @api-bulk-spec @api-specified');

Scenario('Create claim bulk spec', async ({I, api_spec}) => {
  await api_spec.createClaimWithNonRepresentedRespondentBulkClaim(config.applicantSolicitorUser, 'ONE_V_ONE');
  await api_spec.createClaimWithNonRepresentedRespondentBulkClaim(config.applicantSolicitorUser, 'ONE_V_TWO');
});


AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});

