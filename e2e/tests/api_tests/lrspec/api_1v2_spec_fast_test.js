/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD 1v2 API test @api_spec_fast');

Scenario('1v2 counter claim', async ({I, api_spec_fast}) => {
  await api_spec_fast.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec_fast.defendantResponse(config.defendantSolicitorUser, 'COUNTER_CLAIM', 'ONE_V_TWO');
});

Scenario('1v2 full defence', async ({I, api_spec_fast}) => {
  await api_spec_fast.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec_fast.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO');
});

Scenario('1v2 full defence and claimant response', async ({I, api_spec_fast}) => {
  await api_spec_fast.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec_fast.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO');
  await api_spec_fast.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO');
});

Scenario('1v2 full defence and claimant response', async ({I, api_spec_fast}) => {
  await api_spec_fast.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec_fast.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO');
  await api_spec_fast.claimantResponse(config.applicantSolicitorUser, 'NOT_PROCEED', 'ONE_V_TWO');
});

Scenario('1v2 full defence and not proceed', async ({I, api_spec_fast}) => {
  await api_spec_fast.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec_fast.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO');
  await api_spec_fast.claimantResponse(config.applicantSolicitorUser, 'NOT_PROCEED', 'ONE_V_TWO');
});

