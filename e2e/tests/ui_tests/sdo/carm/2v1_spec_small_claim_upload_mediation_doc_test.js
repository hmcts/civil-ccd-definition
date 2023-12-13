/* eslint-disable no-unused-vars */

const config = require('../../../../config.js');

let civilCaseReference;

Feature('SDO Carm - Spec small claims mediation UI test');

Scenario('2v1 claimant and defendant upload mediation documents @888', async ({api_spec, LRspec}) => {
  civilCaseReference = await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'TWO_V_ONE');
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_ADMISSION', 'TWO_V_ONE',
    'JUDICIAL_REFERRAL');
  console.log('2v1 Spec small claims created : ' + civilCaseReference);

  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.uploadMediationDocs(civilCaseReference);
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
