/* eslint-disable no-unused-vars */
const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';

let civilCaseReference,
gaCaseReference;

Feature('GA Claim 1v1 Claimant Response Case Close API tests').tag('@api-nightly-prod @api-case-offline');

Scenario('Case offline APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION', async ({api}) => {
  civilCaseReference = await api.createUnspecifiedClaim(config.applicantSolicitorUser, mpScenario, 'Company');
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  await api.notifyClaimDetails(config.applicantSolicitorUser, civilCaseReference);
  await api.acknowledgeClaim(config.defendantSolicitorUser, civilCaseReference, true);
  console.log('Civil Case created for general application: ' + civilCaseReference);

  console.log('Make a General Application with state APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION');
  gaCaseReference
    = await api.initiateGeneralApplicationWithOutNotice(config.applicantSolicitorUser, civilCaseReference);

  console.log('*** Case offline: ' + civilCaseReference + ' ***');
  await api.defendantResponseClaim(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.claimantResponseClaim(config.applicantSolicitorUser, 'NOT_PROCEED', 'ONE_V_TWO',
    'PROCEEDS_IN_HERITAGE_SYSTEM');
  await api.verifyGAState(config.applicantSolicitorUser, civilCaseReference, gaCaseReference, 'PROCEEDS_IN_HERITAGE');
}).retry(1);

Scenario('Case offline ORDER_MADE', async ({api}) => {
  civilCaseReference = await api.createUnspecifiedClaim(config.applicantSolicitorUser, mpScenario, 'Company');
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  await api.notifyClaimDetails(config.applicantSolicitorUser, civilCaseReference);
  await api.acknowledgeClaim(config.defendantSolicitorUser, civilCaseReference, true);
  console.log('Civil Case created for general application: ' + civilCaseReference);

  console.log('Make a General Application with state ORDER_MADE');
  gaCaseReference
    = await api.initiateGeneralApplicationWithOutNotice(config.applicantSolicitorUser, civilCaseReference);
  console.log('*** Start Judge Make Decision Uncloak and Application Approved on GA Case Reference: '
    + gaCaseReference + ' ***');
    await api.judgeMakesOrderDecisionUncloak(config.judgeUser2WithRegionId2, gaCaseReference);
  console.log('*** End Judge Make Decision Uncloak and Application Approved on GA Case Reference: '
    + gaCaseReference + ' ***');

  console.log('*** Case offline: ' + civilCaseReference + ' ***');
  await api.defendantResponseClaim(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.claimantResponseClaim(config.applicantSolicitorUser, 'NOT_PROCEED', 'ONE_V_TWO',
    'PROCEEDS_IN_HERITAGE_SYSTEM');
  await api.verifyGAState(config.applicantSolicitorUser, civilCaseReference, gaCaseReference, 'ORDER_MADE');
}).retry(1);

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
