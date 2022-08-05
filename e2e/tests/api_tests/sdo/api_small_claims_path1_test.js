/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD SDO API test @api-sdo');

Scenario('create sdo', async ({I, api_sdo}) => {
  await api_sdo.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  // await api_sdo.defendantResponse(config.defendantSolicitorUser, 'FULL_ADMISSION');
  // await api_sdo.claimantResponse(config.applicantSolicitorUser, 'FULL_ADMISSION');
  // await api_sdo.createSDO(config.judgeUser);
  await api_sdo.createSDO(config.applicantSolicitorUser);
});
