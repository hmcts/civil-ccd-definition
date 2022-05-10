/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD 1v1 API test @api-spec @api-spec-1v1');

Scenario('Create claim spec', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
});

Scenario('Inform agreed extension date', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec.informAgreedExtensionDate(config.applicantSolicitorUser);
});

/**
 * creates a claim with LR, responds as the defendant with full defence, and last the applicant responds
 * to defence.
 */
Scenario('Create, respond and applicant respond 1v1 full defence', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec.defendantResponse(config.defendantSolicitorUser);
  await api_spec.claimantResponse(config.applicantSolicitorUser);
});
