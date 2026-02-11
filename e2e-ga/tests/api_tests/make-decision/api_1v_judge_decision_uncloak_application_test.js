/* eslint-disable no-unused-vars */
const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';

let civilCaseReference, gaCaseReference;

Feature('GA 1v1 Uncloak application API').tag('@api-nightly-prod');

Scenario('Judge makes decision 1V1 - ORDER_MADE - Uncloak and Application Approved @debug', async ({api}) => {
  civilCaseReference = await api.createUnspecifiedClaim(config.applicantSolicitorUser, mpScenario, 'Company', '11000');
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  await api.notifyClaimDetails(config.applicantSolicitorUser, civilCaseReference);
  await api.acknowledgeClaim(config.defendantSolicitorUser, civilCaseReference, true);
  await api.defendantResponseClaim(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.claimantResponseUnSpec(config.applicantSolicitorUser, mpScenario, 'JUDICIAL_REFERRAL');

  console.log('Civil Case created for general application: ' + civilCaseReference);
  console.log('Make a General Application without notice');
  gaCaseReference = await api.initiateGeneralApplicationWithOutNotice(config.applicantSolicitorUser,
    civilCaseReference);

  console.log('*** Start Judge Make Decision Uncloak and Application Approved on GA Case Reference: '
    + gaCaseReference + ' ***');
  const doc = 'generalOrder';
  await api.judgeMakesOrderDecisionUncloak(config.judgeUser2WithRegionId2, gaCaseReference);
  console.log('*** End Judge Make Decision Uncloak and Application Approved on GA Case Reference: '
    + gaCaseReference + ' ***');

  await api.assertGaDocumentVisibilityToUser(config.applicantSolicitorUser, civilCaseReference, gaCaseReference, doc);
  await api.assertGaDocumentVisibilityToUser(config.defendantSolicitorUser, civilCaseReference, gaCaseReference, doc);
}).retry(1);

Scenario('Judge makes decision 1V1 - REQUEST_MORE_INFORMATION - Uncloak Application', async ({api}) => {
  civilCaseReference = await api.createUnspecifiedClaim(config.applicantSolicitorUser, mpScenario, 'Company', '11000');
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  await api.notifyClaimDetails(config.applicantSolicitorUser, civilCaseReference);
  await api.acknowledgeClaim(config.defendantSolicitorUser, civilCaseReference, true);
  await api.defendantResponseClaim(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.claimantResponseUnSpec(config.applicantSolicitorUser, mpScenario, 'JUDICIAL_REFERRAL');

  console.log('Civil Case created for general application: ' + civilCaseReference);
  console.log('Make a General Application without notice');
  gaCaseReference = await api.initiateGeneralApplicationWithOutNotice(config.applicantSolicitorUser,
    civilCaseReference);

  console.log('*** Start Judge Request More Information and Uncloak Application on GA Case Reference: '
    + gaCaseReference + ' ***');
  await api.judgeRequestMoreInformationUncloak(config.judgeUser2WithRegionId2, gaCaseReference, true, true);
  console.log('*** End Judge Request More Information and Uncloak Application on GA Case Reference: '
    + gaCaseReference + ' ***');

  console.log('*** Start Callback for Additional Payment: ' + gaCaseReference + ' ***');
  await api.additionalPaymentSuccess(config.applicantSolicitorUser, gaCaseReference, 'AWAITING_RESPONDENT_RESPONSE');
  console.log('*** End Judge Make Decision Application Dismiss on GA Case Reference: ' + gaCaseReference + ' ***');

}).retry(1);

Scenario('Judge makes decision 1V1 - REQUEST_MORE_INFORMATION - Payment fails', async ({api}) => {

  civilCaseReference = await api.createUnspecifiedClaim(config.applicantSolicitorUser, mpScenario, 'Company', '11000');
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  await api.notifyClaimDetails(config.applicantSolicitorUser, civilCaseReference);
  await api.acknowledgeClaim(config.defendantSolicitorUser, civilCaseReference, true);
  await api.defendantResponseClaim(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.claimantResponseUnSpec(config.applicantSolicitorUser, mpScenario, 'JUDICIAL_REFERRAL');

  console.log('Civil Case created for general application: ' + civilCaseReference);
  console.log('Make a General Application without notice');
  gaCaseReference = await api.initiateGeneralApplicationWithOutNotice(config.applicantSolicitorUser,
    civilCaseReference);

  console.log('*** Start Judge Request More Information and Uncloak Application on GA Case Reference: '
    + gaCaseReference + ' ***');
  await api.judgeRequestMoreInformationUncloak(config.judgeUser2WithRegionId2, gaCaseReference, true, true);
  console.log('*** End Judge Request More Information and Uncloak Application on GA Case Reference: '
    + gaCaseReference + ' ***');

  console.log('*** Start Callback for Additional Payment Failure: ' + gaCaseReference + ' ***');
  await api.additionalPaymentFailure(config.applicantSolicitorUser, gaCaseReference);
  console.log('*** End Callback for Additional Payment Failure on GA Case Reference: ' + gaCaseReference + ' ***');

}).retry(1);

Scenario('Judge makes decision 1V1 - REQUEST_MORE_INFORMATION - Uncloak Application - Response - Directions Order', async ({api}) => {

  civilCaseReference = await api.createUnspecifiedClaim(config.applicantSolicitorUser, mpScenario, 'Company', '11000');
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  await api.notifyClaimDetails(config.applicantSolicitorUser, civilCaseReference);
  await api.acknowledgeClaim(config.defendantSolicitorUser, civilCaseReference, true);
  await api.defendantResponseClaim(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.claimantResponseUnSpec(config.applicantSolicitorUser, mpScenario, 'JUDICIAL_REFERRAL');

  console.log('Civil Case created for general application: ' + civilCaseReference);
  console.log('Make a General Application without notice');
  gaCaseReference = await api.initiateGeneralApplicationWithOutNotice(config.applicantSolicitorUser,
    civilCaseReference);

  console.log('*** Start Judge Request More Information and Uncloak Application on GA Case Reference: '
    + gaCaseReference + ' ***');
  await api.judgeRequestMoreInformationUncloak(config.judgeUser2WithRegionId2, gaCaseReference, true, true);
  console.log('*** End Judge Request More Information and Uncloak Application on GA Case Reference: '
    + gaCaseReference + ' ***');

  console.log('*** Start Callback for Additional Payment: ' + gaCaseReference + ' ***');
  await api.additionalPaymentSuccess(config.applicantSolicitorUser, gaCaseReference, 'AWAITING_RESPONDENT_RESPONSE');
  console.log('*** End Callback for Additional Payment on GA Case Reference: ' + gaCaseReference + ' ***');

  console.log('*** Start Respondent respond to Judge Additional information on GA Case Reference: '
    + gaCaseReference + ' ***');
  await api.respondentResponse(config.defendantSolicitorUser, gaCaseReference);
  console.log('*** End Respondent respond to Judge Additional information on GA Case Reference: '
    + gaCaseReference + ' ***');

  console.log('*** Start Judge Make Decision on GA Case Reference: ' + gaCaseReference + ' ***');
  await api.judgeMakesDecisionDirectionsOrder(config.judgeUser2WithRegionId2, gaCaseReference);
  console.log('*** End Judge Make Decision GA Case Reference: ' + gaCaseReference + ' ***');

  const doc = 'directionOrder';
  await api.assertGaDocumentVisibilityToUser(config.applicantSolicitorUser, civilCaseReference, gaCaseReference, doc);
  await api.assertGaDocumentVisibilityToUser(config.defendantSolicitorUser, civilCaseReference, gaCaseReference, doc);
}).retry(1);

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
