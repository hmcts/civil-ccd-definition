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

Scenario.skip('1v1 full admit claimant and defendant response', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'FULL_ADMISSION');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_ADMISSION');
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_ADMISSION');
});

Scenario.skip('1v1 part admit defence claimant and defendant response', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'PART_ADMISSION');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'PART_ADMISSION');
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'PART_ADMISSION');
});
