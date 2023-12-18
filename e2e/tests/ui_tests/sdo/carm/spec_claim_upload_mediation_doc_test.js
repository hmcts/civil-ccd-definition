/* eslint-disable no-unused-vars */

const config = require('../../../../config.js');
const judgeUser = config.testEarlyAdopterCourts ? config.judgeUser2WithRegionId2 : config.judgeUserWithRegionId1;

let civilCaseReference;

Feature('SDO Carm - Upload mediation documents');

Scenario('2v1 claimant and defendant upload mediation documents @carm @non-prod-e2e-ft', async ({api_spec, LRspec}) => {
  civilCaseReference = await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'TWO_V_ONE');
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_ADMISSION', 'TWO_V_ONE',
    'JUDICIAL_REFERRAL');
  console.log('2v1 Spec small claims created : ' + civilCaseReference);

  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.uploadMediationDocs(civilCaseReference, 'Both Claimants', 'Both docs');
  await LRspec.click('Sign out');
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.uploadMediationDocs(civilCaseReference, 'Defendant 1', 'Non-attendance');
});

Scenario('1v2 upload mediation documents in different SDO states @carm @e2e-nightly-nonprod', async ({api_spec, LRspec}) => {
  civilCaseReference = await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO');
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO', 'JUDICIAL_REFERRAL');
  await LRspec.wait(10);
  console.log('1v2 Spec claims created : ' + civilCaseReference);

  console.log('Create SDO');
  await api_spec.createSDO(judgeUser, 'CREATE_SMALL');
  await LRspec.wait(10);

  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.uploadMediationDocs(civilCaseReference, 'Claimant 1', 'Both docs');
  await LRspec.click('Sign out');

  console.log('Schedule Hearing');
  await api_spec.scheduleHearing(config.hearingCenterAdminWithRegionId1, 'SMALL_CLAIMS');
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.uploadMediationDocs(civilCaseReference, 'Defendant 1', 'Non-attendance');
  await LRspec.click('Sign out');

  console.log('Prepare for Hearing Conduct Hearing');
  await api_spec.amendHearingDueDate(config.systemupdate);
  await api_spec.hearingFeePaid(config.hearingCenterAdminWithRegionId1);
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.uploadMediationDocs(civilCaseReference, 'Defendant 2', 'Both docs');
  await LRspec.click('Sign out');
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
