/* eslint-disable no-unused-vars */

const config = require('../config.js');
const mpScenario = 'ONE_V_ONE';

Feature('CCD 1v1 API test @api-spec @api-multiparty @api-spec-1v1');

Scenario('Create claim spec', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
});
