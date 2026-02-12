/* eslint-disable no-unused-vars */
const config = require('../../../../config.js');
const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';

let civilCaseReference, gaCaseReference;

Feature('GA 1v2 Notify Claim Details Case Close API tests').tag('@api-nightly-prod');

Scenario('Case offline 1V2 notify_claim_details AWAITING_DIRECTIONS_ORDER_DOCS', async ({api_ga}) => {
  civilCaseReference = await api_ga.createUnspecifiedClaim(
  config.applicantSolicitorUser, mpScenario, 'Company');
  await api_ga.amendClaimDocuments(config.applicantSolicitorUser);
  await api_ga.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);

  gaCaseReference
    = await api_ga.initiateGeneralApplicationWithState(config.applicantSolicitorUser, civilCaseReference, 'AWAITING_RESPONDENT_RESPONSE');
  console.log('*** Start response to GA Case Reference: ' + gaCaseReference + ' ***');
  await api_ga.respondentResponse1v2(config.defendantSolicitorUser, config.secondDefendantSolicitorUser, gaCaseReference);
  console.log('*** End Response to GA Case Reference: ' + gaCaseReference + ' ***');

  console.log('*** Start Judge List the application for hearing on GA Case Reference: ' + gaCaseReference + ' ***');

  await api_ga.judgeMakesDecisionDirectionsOrder(config.judgeUser2WithRegionId2, gaCaseReference);
  console.log('*** End Judge List the application for hearing GA Case Reference: ' + gaCaseReference + ' ***');

  console.log('Case offline');

  // Reinstate lines below when DTSCCI-1400 is complete
  // await api_ga.partialNotifyClaimDetails(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  // await api_ga.verifyGAState(config.applicantSolicitorUser, civilCaseReference, gaCaseReference, 'PROCEEDS_IN_HERITAGE');
}).retry(1);

AfterSuite(async ({api_ga}) => {
  await api_ga.cleanUp();
});
