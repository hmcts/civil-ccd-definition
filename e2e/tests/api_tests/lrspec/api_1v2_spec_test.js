/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD 2v1 API test @api-spec');
Scenario('2v1 counter claim', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'COUNTER_CLAIM', 'ONE_V_TWO');
});


