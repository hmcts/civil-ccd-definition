const config = require('../../../../config.js');

const mpScenario = 'ONE_V_ONE';
let civilCaseReference, gaCaseReference;

Feature('Smoke - GA case-offline CCD wiring').tag('@civil-service-smoke @api-ga-case-offline');

// Service-owned offline state handling is covered by civil-service workflow integration tests.
// This scenario verifies that taking the parent claim offline triggers the linked GA CCD event.
Scenario('Take a live GA offline when the parent claim goes offline', async ({api_ga}) => {
  civilCaseReference = await api_ga.createUnspecifiedClaim(config.applicantSolicitorUser, mpScenario, 'Company');
  await api_ga.amendClaimDocuments(config.applicantSolicitorUser);
  await api_ga.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  await api_ga.notifyClaimDetails(config.applicantSolicitorUser, civilCaseReference);
  await api_ga.acknowledgeClaim(config.defendantSolicitorUser, civilCaseReference, true);
  console.log('Civil Case created for general application: ' + civilCaseReference);

  console.log('Make a General Application with state APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION');
  gaCaseReference
    = await api_ga.initiateGeneralApplicationWithOutNotice(config.applicantSolicitorUser, civilCaseReference);

  console.log('*** Case offline: ' + civilCaseReference + ' ***');
  await api_ga.defendantResponseClaim(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api_ga.claimantResponseClaim(config.applicantSolicitorUser, 'NOT_PROCEED', 'ONE_V_TWO',
    'PROCEEDS_IN_HERITAGE_SYSTEM');
  await api_ga.verifyGAState(config.applicantSolicitorUser, civilCaseReference, gaCaseReference, 'PROCEEDS_IN_HERITAGE');
}).retry(1);

// Terminal-state preservation is covered in civil-service. Retain this as a disabled reference
// journey; manually re-enable it for local CCD diagnostics.
Scenario.skip('Case offline ORDER_MADE', async ({api_ga}) => {
  civilCaseReference = await api_ga.createUnspecifiedClaim(config.applicantSolicitorUser, mpScenario, 'Company');
  await api_ga.amendClaimDocuments(config.applicantSolicitorUser);
  await api_ga.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  await api_ga.notifyClaimDetails(config.applicantSolicitorUser, civilCaseReference);
  await api_ga.acknowledgeClaim(config.defendantSolicitorUser, civilCaseReference, true);
  console.log('Civil Case created for general application: ' + civilCaseReference);

  console.log('Make a General Application with state ORDER_MADE');
  gaCaseReference
    = await api_ga.initiateGeneralApplicationWithOutNotice(config.applicantSolicitorUser, civilCaseReference);
  console.log('*** Start Judge Make Decision Uncloak and Application Approved on GA Case Reference: '
    + gaCaseReference + ' ***');
    await api_ga.judgeMakesOrderDecisionUncloak(config.judgeUser2WithRegionId2, gaCaseReference);
  console.log('*** End Judge Make Decision Uncloak and Application Approved on GA Case Reference: '
    + gaCaseReference + ' ***');

  console.log('*** Case offline: ' + civilCaseReference + ' ***');
  await api_ga.defendantResponseClaim(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api_ga.claimantResponseClaim(config.applicantSolicitorUser, 'NOT_PROCEED', 'ONE_V_TWO',
    'PROCEEDS_IN_HERITAGE_SYSTEM');
  await api_ga.verifyGAState(config.applicantSolicitorUser, civilCaseReference, gaCaseReference, 'ORDER_MADE');
}).retry(1);

AfterSuite(async ({api_ga}) => {
  await api_ga.cleanUp();
});
