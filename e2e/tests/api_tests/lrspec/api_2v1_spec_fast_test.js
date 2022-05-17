/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD 2v1 API test @api-spec-fast');
Scenario('2v1 full defence', async ({I, api_spec_fast}) => {
  await api_spec_fast.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  await api_spec_fast.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'TWO_V_ONE');
});

Scenario('2v1 counter claim', async ({I, api_spec_fast}) => {
  await api_spec_fast.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  await api_spec_fast.defendantResponse(config.defendantSolicitorUser, 'COUNTER_CLAIM', 'TWO_V_ONE');
});

Scenario('2v1 different response full defence', async ({I, api_spec_fast}) => {
  await api_spec_fast.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  await api_spec_fast.defendantResponse(config.defendantSolicitorUser, 'DIFF_FULL_DEFENCE', 'TWO_V_ONE');
});

Scenario('2v1 different response no full defence', async ({I, api_spec_fast}) => {
  await api_spec_fast.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  await api_spec_fast.defendantResponse(config.defendantSolicitorUser, 'DIFF_NOT_FULL_DEFENCE', 'TWO_V_ONE');
});

Scenario('2v1 full admission', async ({I, api_spec_fast}) => {
  await api_spec_fast.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  await api_spec_fast.defendantResponse(config.defendantSolicitorUser, 'FULL_ADMISSION', 'TWO_V_ONE');
});

Scenario('2v1 part admission', async ({I, api_spec_fast}) => {
  await api_spec_fast.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  await api_spec_fast.defendantResponse(config.defendantSolicitorUser, 'PART_ADMISSION', 'TWO_V_ONE');
});

Scenario('2v1 full defence and claimant response', async ({I, api_spec_fast}) => {
  await api_spec_fast.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  await api_spec_fast.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'TWO_V_ONE');
  await api_spec_fast.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'TWO_V_ONE');
});

Scenario.skip('2v1 full defence and not proceed', async ({I, api_spec_fast}) => {
  await api_spec_fast.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  await api_spec_fast.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'TWO_V_ONE');
  await api_spec_fast.claimantResponse(config.applicantSolicitorUser, 'NOT_PROCEED', 'TWO_V_ONE');
});

Scenario('2v1 full admission and claimant response', async ({I, api_spec_fast}) => {
  await api_spec_fast.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  await api_spec_fast.defendantResponse(config.defendantSolicitorUser, 'FULL_ADMISSION', 'TWO_V_ONE');
  await api_spec_fast.claimantResponse(config.applicantSolicitorUser, 'FULL_ADMISSION', 'TWO_V_ONE');
});

Scenario('2v1 part admission and claimant response', async ({I, api_spec_fast}) => {
  await api_spec_fast.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  await api_spec_fast.defendantResponse(config.defendantSolicitorUser, 'PART_ADMISSION', 'TWO_V_ONE');
  await api_spec_fast.claimantResponse(config.applicantSolicitorUser, 'PART_ADMISSION', 'TWO_V_ONE');
});

