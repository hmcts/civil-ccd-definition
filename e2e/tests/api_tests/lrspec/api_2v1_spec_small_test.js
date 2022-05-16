/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD 2v1 API test @api-spec-small');
Scenario('2v1 full defence', async ({I, api_spec_small}) => {
  await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  await api_spec_small.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'TWO_V_ONE');
});

Scenario('2v1 full defence and defendant response', async ({I, api_spec_small}) => {
  await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  await api_spec_small.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'TWO_V_ONE');
  await api_spec_small.claimantResponse(config.applicantSolicitorUser, 'TWO_V_ONE');
});

Scenario('2v1 counter claim', async ({I, api_spec_small}) => {
  await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  await api_spec_small.defendantResponse(config.defendantSolicitorUser, 'COUNTER_CLAIM', 'TWO_V_ONE');
});

Scenario('2v1 full admission', async ({I, api_spec_small}) => {
  await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  await api_spec_small.defendantResponse(config.defendantSolicitorUser, 'FULL_ADMISSION', 'TWO_V_ONE');
});

Scenario('2v1 part admission', async ({I, api_spec_small}) => {
  await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  await api_spec_small.defendantResponse(config.defendantSolicitorUser, 'PART_ADMISSION', 'TWO_V_ONE');
});


