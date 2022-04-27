/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD 1v1 API test @api-spec @api-spec-1v1');

Scenario.skip('Create claim spec', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
});

Scenario('Inform agreed extension date', async ({I, api_spec}) => {
  await api_spec.informAgreedExtensionDate(config.applicantSolicitorUser);
});
