/* eslint-disable no-unused-vars */
const config = require('../../../config.js');

let civilCaseReference,
gaCaseReference;

Feature('GA SPEC Claim 1v2 Claimant Response Case Close API tests').tag('@api-nightly-prod');

Scenario('Case offline LISTING_FOR_A_HEARING', async ({api}) => {
  civilCaseReference = await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
  console.log('Civil Case created for general application: ' + civilCaseReference);
  gaCaseReference
    = await api.initiateGeneralApplication(config.applicantSolicitorUser, civilCaseReference);
  console.log('*** Start response to GA Case Reference: ' + gaCaseReference + ' ***');
  await api.respondentResponse(config.defendantSolicitorUser, gaCaseReference);
  console.log('*** End Response to GA Case Reference: ' + gaCaseReference + ' ***');

  console.log('*** Start Judge List the application for hearing on GA Case Reference: ' + gaCaseReference + ' ***');
  await api.judgeListApplicationForHearing(config.judgeUser2WithRegionId2, gaCaseReference);

  console.log('*** End Judge List the application for hearing GA Case Reference: ' + gaCaseReference + ' ***');


  console.log('*** Case offline: ' + civilCaseReference + ' ***');
  await api.defendantResponseSpecClaim(config.defendantSolicitorUser, 'PART_ADMISSION', 'ONE_V_TWO');
  await api.claimantResponseClaimSpec(config.applicantSolicitorUser, 'PART_ADMISSION', 'ONE_V_TWO',
    'All_FINAL_ORDERS_ISSUED');
  await api.verifyGAState(config.applicantSolicitorUser, civilCaseReference, gaCaseReference, 'PROCEEDS_IN_HERITAGE');
}).retry(1);

Scenario('Case offline APPLICATION_DISMISSED', async ({api}) => {
  civilCaseReference = await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  console.log('Civil Case created for general application: ' + civilCaseReference);
  console.log('Make a General Application with state APPLICATION_DISMISSED');
  gaCaseReference
    = await api.initiateGeneralApplicationWithOutNotice(config.applicantSolicitorUser, civilCaseReference);
  console.log('*** Start Judge Make Decision Application Dismiss on GA Case Reference: '
    + gaCaseReference + ' ***');
  await api.judgeDismissApplication(config.judgeUser2WithRegionId2, gaCaseReference);
  console.log('*** End Judge Make Decision Application Dismiss on GA Case Reference: '
    + gaCaseReference + ' ***');

  console.log('*** Case offline: ' + civilCaseReference + ' ***');
  await api.defendantResponseSpecClaim(config.defendantSolicitorUser, 'PART_ADMISSION', 'ONE_V_TWO');
  await api.claimantResponseClaimSpec(config.applicantSolicitorUser, 'PART_ADMISSION', 'ONE_V_TWO',
    'AWAITING_APPLICANT_INTENTION');
  await api.verifyGAState(config.applicantSolicitorUser, civilCaseReference, gaCaseReference, 'APPLICATION_DISMISSED');
}).retry(1);

Scenario('Case offline AWAITING_RESPONDENT_RESPONSE', async ({api}) => {
  civilCaseReference = await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  console.log('Civil Case created for general application: ' + civilCaseReference);
  console.log('Make a General Application');
  gaCaseReference
    = await api.initiateGeneralApplication(config.applicantSolicitorUser, civilCaseReference);

  console.log('*** Case offline: ' + civilCaseReference + ' ***');
  await api.defendantResponseSpecClaim(config.defendantSolicitorUser, 'PART_ADMISSION', 'ONE_V_TWO');
  await api.claimantResponseClaimSpec(config.applicantSolicitorUser, 'PART_ADMISSION', 'ONE_V_TWO',
    'AWAITING_APPLICANT_INTENTION');
  await api.verifyGAState(config.applicantSolicitorUser, civilCaseReference, gaCaseReference, 'PROCEEDS_IN_HERITAGE');
}).retry(1);

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
