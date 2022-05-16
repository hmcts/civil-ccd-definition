/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD 1v1 API test @api-spec @api-spec-1v1');

Scenario.skip('Create claim spec 1v1', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
});

Scenario.skip('1v1 full admit', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_ADMISSION');
});

Scenario.skip('1v1 part admit', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'PART_ADMISSION');
});

Scenario.skip('1v1 counter claim', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'COUNTER_CLAIM');
});

Scenario.skip('Inform agreed extension date', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec.informAgreedExtensionDate(config.applicantSolicitorUser);
});

Scenario.skip('1v1 full defence claimant and defendant response', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec.defendantResponse(config.defendantSolicitorUser);
  await api_spec.claimantResponse(config.applicantSolicitorUser);
});

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


