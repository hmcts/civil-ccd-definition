/* eslint-disable no-unused-vars */

const config = require('../../../../config.js');

let civilCaseReference;

Feature('SDO Carm - Upload mediation documents @carm @non-prod-e2e-ft');

Scenario('Prepare claim', async ({api_spec}) => {
  civilCaseReference = await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'TWO_V_ONE');
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_ADMISSION', 'TWO_V_ONE',
    'JUDICIAL_REFERRAL');
  console.log('2v1 Spec small claims created : ' + civilCaseReference);
});

Scenario('claimant LR uploads mediation documents', async ({LRspec}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.uploadMediationDocs(civilCaseReference, 'Both Claimants', 'Both docs');
  await LRspec.click('Sign out');
});

Scenario('defendant LR uploads mediation documents', async ({LRspec}) => {
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.uploadMediationDocs(civilCaseReference, 'Defendant 1', 'Non-attendance');
  await LRspec.click('Sign out');
});

AfterSuite(async ({api_spec}) => {
  //await api_spec.cleanUp();
});
