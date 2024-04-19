/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD 1v1 API test spec intermediate and multi track @api-spec-multi-intermediate @api-nonprod');

Scenario('1v1 full defence Multi claim @api-nonprod-specified', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE', false, 'MULTI_CLAIM');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE',
    'AWAITING_APPLICANT_INTENTION', false, 'MULTI_CLAIM');
});

Scenario('1v1 full defence Intermediate claim @api-nonprod-specified', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE', false, 'INTERMEDIATE_CLAIM');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE',
    'AWAITING_APPLICANT_INTENTION', false, 'INTERMEDIATE_CLAIM');
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});

