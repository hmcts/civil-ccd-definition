/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('Spec small claims mediation API test @api-spec-mediation @api-nonprod');

Scenario('1v1 claimant and defendant upload mediation documents', async ({api_spec_small}) => {
  await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec_small.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE');
  await api_spec_small.claimantResponse(config.applicantSolicitorUser, true, 'No');
  await api_spec_small.uploadMediationDocuments(config.applicantSolicitorUser);
  await api_spec_small.uploadMediationDocuments(config.defendantSolicitorUser);
});

Scenario('1v2 same solicitor claimant and defendant upload mediation documents', async ({api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO');
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO', 'JUDICIAL_REFERRAL');
  await api_spec.uploadMediationDocuments(config.applicantSolicitorUser );
  await api_spec.uploadMediationDocuments(config.defendantSolicitorUser);
});

Scenario('1v2 different solicitor claimant and defendant upload mediation documents', async ({api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE1', 'ONE_V_ONE_DIF_SOL',
    'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
  await api_spec.defendantResponse(config.secondDefendantSolicitorUser, 'FULL_DEFENCE2', 'ONE_V_ONE_DIF_SOL',
    'AWAITING_APPLICANT_INTENTION');
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE', 'JUDICIAL_REFERRAL');
  await api_spec.uploadMediationDocuments(config.applicantSolicitorUser);
  await api_spec.uploadMediationDocuments(config.defendantSolicitorUser);
  await api_spec.uploadMediationDocuments(config.secondDefendantSolicitorUser);
});

Scenario('2v1 claimant and defendant upload mediation documents', async ({api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'TWO_V_ONE');
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'TWO_V_ONE', 'JUDICIAL_REFERRAL');
  await api_spec.uploadMediationDocuments(config.applicantSolicitorUser);
  await api_spec.uploadMediationDocuments(config.defendantSolicitorUser);
});

AfterSuite(async ({api_spec_small, api_spec}) => {
  await api_spec_small.cleanUp();
  await api_spec.cleanUp();
});
