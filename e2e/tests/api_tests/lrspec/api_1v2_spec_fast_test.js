/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD 1v1 API test @api-spec');

Scenario.skip('1v2 counter claim', async ({I, api_spec_fast}) => {
  await api_spec_fast.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec_fast.defendantResponse(config.defendantSolicitorUser, 'COUNTER_CLAIM', 'ONE_V_TWO');
});

Scenario.skip('1v2 full defence, defendant response', async ({I, api_spec_fast}) => {
  await api_spec_fast.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec_fast.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO');
});
