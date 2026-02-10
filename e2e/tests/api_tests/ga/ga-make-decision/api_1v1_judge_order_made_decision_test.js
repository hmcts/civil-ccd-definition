/* eslint-disable no-unused-vars */
const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';
const genAppType = 'STAY_THE_CLAIM';

let civilCaseReference, gaCaseReference, state;

Feature('GA 1v1 Judge make decision order made API tests').tag('@api-nightly-prod @api-ga-make-decision');

Scenario('Judge makes decision 1V1 - Order Made', async ({api}) => {

  civilCaseReference = await api.createUnspecifiedClaim(config.applicantSolicitorUser, mpScenario, 'Company', '11000');
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  await api.notifyClaimDetails(config.applicantSolicitorUser, civilCaseReference);
  await api.acknowledgeClaim(config.defendantSolicitorUser, civilCaseReference, true);
  await api.defendantResponseClaim(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.claimantResponseUnSpec(config.applicantSolicitorUser, mpScenario, 'JUDICIAL_REFERRAL');
  console.log('Civil Case created for general application: ' + civilCaseReference);
  console.log('Make a General Application');
  gaCaseReference = await api.initiateGeneralApplicationWithStayClaim(config.applicantSolicitorUser, civilCaseReference);

  console.log('*** Start response to GA Case Reference: ' + gaCaseReference + ' ***');
  await api.respondentResponse(config.defendantSolicitorUser, gaCaseReference);
  console.log('*** End Response to GA Case Reference: ' + gaCaseReference + ' ***');
  console.log('*** Start Judge makes decision order made and : ' + gaCaseReference + ' ***');

state = await api.judgeMakesDecisionOrderMadeStayClaimAppln(config.judgeUser2WithRegionId2, gaCaseReference);
console.log('*** End Judge makes decision order made - GA Case Reference: ' + gaCaseReference + ' ***');
}).retry(1).tag('@api-prod @ui-ga-prod');

Scenario('Judge Revisit 1V1 unspec - Order Made End Date Scheduler', async ({api}) => {

  console.log('*** Triggering Judge Revisit Order Made Scheduler ***');
  await api.judgeRevisitScheduler(gaCaseReference, state, genAppType);
  console.log('*** End of Judge Revisit Order Made Scheduler ***');

}).retry(1);

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
