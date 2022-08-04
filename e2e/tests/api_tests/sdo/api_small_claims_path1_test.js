/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD SDO API test @api-sdo');

Scenario('create sdo', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'FULL_ADMISSION');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_ADMISSION');
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_ADMISSION');
  await api_spec.createSDO(config.judgeUser);
});
