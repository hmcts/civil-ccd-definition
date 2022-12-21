/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD 1v1 API test @api-spec-cui');

Scenario('1v1 full admit claimant and defendant response', async ({I, api_spec_cui}) => {
  await api_spec_cui.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec_cui.defendantResponse(config.defendantSolicitorUser, 'FULL_ADMISSION');
  await api_spec_cui.claimantResponse(config.applicantSolicitorUser, 'FULL_ADMISSION', 'ONE_V_ONE',
    'AWAITING_APPLICANT_INTENTION');
});

Scenario('1v1 part admit claimant and defendant response', async ({I, api_spec_cui}) => {
  await api_spec_cui.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec_cui.defendantResponse(config.defendantSolicitorUser, 'PART_ADMISSION');
  await api_spec_cui.claimantResponse(config.applicantSolicitorUser, 'PART_ADMISSION', 'ONE_V_ONE',
    'AWAITING_APPLICANT_INTENTION');
});
