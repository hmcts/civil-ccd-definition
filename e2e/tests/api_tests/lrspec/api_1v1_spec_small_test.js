/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD 1v1 API test @api-spec-small @api-specified @api-nightly-prod @api-prod-specified');

Scenario('1v1 FULL_DEFENCE claimant and defendant response small claim', async ({I, api_spec_small}) => {
  await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec_small.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE');
  await api_spec_small.claimantResponse(config.applicantSolicitorUser, true);
  await api_spec_small.manageContactInformation(config.adminUser, true);
});

Scenario('1v1 FULL_ADMISSION claimant and defendant response small claim', async ({I, api_spec_small}) => {
  await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec_small.defendantResponse(config.defendantSolicitorUser, 'FULL_ADMISSION');
  await api_spec_small.claimantResponse(config.applicantSolicitorUser, true);
});

Scenario('1v1 PART_ADMISSION claimant and defendant response small claim', async ({I, api_spec_small}) => {
  await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec_small.defendantResponse(config.defendantSolicitorUser, 'PART_ADMISSION');
  await api_spec_small.claimantResponse(config.applicantSolicitorUser, true);
});

Scenario('1v1 COUNTER_CLAIM claimant and defendant response small claim', async ({I, api_spec_small}) => {
  await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec_small.defendantResponse(config.defendantSolicitorUser, 'COUNTER_CLAIM');
  // counter claim defense brings the case offline
});
