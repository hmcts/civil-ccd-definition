/* eslint-disable no-unused-vars */
const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';

let civilCaseReference, gaCaseReference;

Feature('GA 1v1 Judge Make Order Directions Order API tests').tag('@api-prod @ui-prod @api-directions-order');

Scenario('Judge makes decision 1V1 - VARY-JUDGEMENT - DIRECTIONS ORDER - Respondent upload Directions Document', async ({api}) => {

  civilCaseReference = await api.createUnspecifiedClaim(config.applicantSolicitorUser, mpScenario, 'Company', '11000');
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  await api.notifyClaimDetails(config.applicantSolicitorUser, civilCaseReference);
  await api.acknowledgeClaim(config.defendantSolicitorUser, civilCaseReference, true);
  await api.defendantResponseClaim(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.claimantResponseUnSpec(config.applicantSolicitorUser, mpScenario, 'JUDICIAL_REFERRAL');
  console.log('Civil Case created for general application: ' + civilCaseReference);
  console.log('Make a General Application');
  gaCaseReference = await api.initiateGaWithVaryJudgement(config.applicantSolicitorUser, civilCaseReference, true, false);

  console.log('*** Start response to GA Case Reference: ' + gaCaseReference + ' ***');
  await api.respondentResponse(config.defendantSolicitorUser, gaCaseReference);
  console.log('*** End Response to GA Case Reference: ' + gaCaseReference + ' ***');

  console.log('*** Start Judge Directions Order on GA Case Reference: ' + gaCaseReference + ' ***');
  await api.judgeMakesDecisionDirectionsOrder(config.judgeUser2WithRegionId2, gaCaseReference);
  console.log('*** End Judge Directions Order GA Case Reference: ' + gaCaseReference + ' ***');

  console.log('*** Start Respondent respond to Judge Directions on GA Case Reference: ' + gaCaseReference + ' ***');
  await api.respondentResponseToJudgeDirections(config.applicantSolicitorUser, gaCaseReference);
  console.log('*** End Respondent respond to Judge Directions GA Case Reference: ' + gaCaseReference + ' ***');
  let doc = 'gaAddl';
  await api.assertDocumentVisibilityToUser(config.applicantSolicitorUser, 'Claimant', civilCaseReference, gaCaseReference, doc);
}).retry(1);

Scenario('Judge makes decision 1V1 - VARY-JUDGEMENT  as DEFENDANT - PROCEEDS IN HERITAGE', async ({api}) => {
  civilCaseReference = await api.createUnspecifiedClaim(config.applicantSolicitorUser, mpScenario, 'Company', '11000');
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  await api.notifyClaimDetails(config.applicantSolicitorUser, civilCaseReference);
  await api.acknowledgeClaim(config.defendantSolicitorUser, civilCaseReference, true);
  await api.defendantResponseClaim(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.claimantResponseUnSpec(config.applicantSolicitorUser, mpScenario, 'JUDICIAL_REFERRAL');
  console.log('Civil Case created for general application: ' + civilCaseReference);
  console.log('Make a General Application');
  gaCaseReference = await api.initiateGaWithVaryJudgement(config.defendantSolicitorUser, civilCaseReference, false, false);

  console.log('*** Start response to GA Case Reference: ' + gaCaseReference + ' ***');
  await api.respondentDebtorResponse(config.applicantSolicitorUser, gaCaseReference, false);
  console.log('*** End Response to GA Case Reference: ' + gaCaseReference + ' ***');
}).retry(1);

AfterSuite(async ({api}) => {
  await api.cleanUp();
});

