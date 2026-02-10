/* eslint-disable no-unused-vars */
const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';

let civilCaseReference, gaCaseReference;

Feature('GA SPEC Claim 1v1 Judge Make Order Directions Order API tests').tag('@api-nightly-prod @api-ga-directions-order');

Scenario('Judge makes decision 1V1 Specified case- DIRECTIONS ORDER', async ({api}) => {
  civilCaseReference = await api.createSpecifiedClaim(
    config.applicantSolicitorUser, mpScenario);
  console.log('Civil Case created for general application: ' + civilCaseReference);
  console.log('Make a General Application');
  gaCaseReference = await api.initiateGeneralApplication(config.applicantSolicitorUser, civilCaseReference);

  console.log('*** Start response to GA Case Reference: ' + gaCaseReference + ' ***');
  await api.respondentResponse(config.defendantSolicitorUser, gaCaseReference, false);
  console.log('*** End Response to GA Case Reference: ' + gaCaseReference + ' ***');

  console.log('*** Start Judge Directions Order on GA Case Reference: ' + gaCaseReference + ' ***');
  console.log('config.runningEnv: ' + config.runningEnv + ' ***');
  await api.judgeMakesDecisionDirectionsOrder(config.judgeUser2WithRegionId2, gaCaseReference);
  console.log('*** End Judge Directions Order GA Case Reference: ' + gaCaseReference + ' ***');

  console.log('*** Start Respondent respond to Judge Directions on GA Case Reference: ' + gaCaseReference + ' ***');
  await api.respondentResponseToJudgeDirections(config.applicantSolicitorUser, gaCaseReference);
  console.log('*** End Respondent respond to Judge Directions GA Case Reference: ' + gaCaseReference + ' ***');
}).retry(1).tag('@api-prod @ui-ga-prod');


Scenario('Make an Urgent General Application with Vary payment terms of judgment', async ({api}) => {
  civilCaseReference = await api.createSpecifiedClaim(
    config.applicantSolicitorUser, mpScenario);
  console.log('Civil Case created for general application: ' + civilCaseReference);
  console.log('Make a General Application');
  gaCaseReference = await api.initiateGaWithVaryJudgement(config.applicantSolicitorUser,
    civilCaseReference, true, true);
}).retry(1);

AfterSuite(async ({api}) => {
  await api.cleanUp();
});


