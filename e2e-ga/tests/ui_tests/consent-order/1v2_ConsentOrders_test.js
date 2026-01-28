/* eslint-disable no-unused-vars */
const config = require('../../../config.js');
const states = require('../../../fixtures/ga-ccd/state');
const {waitForGACamundaEventsFinishedBusinessProcess} = require('../../../api/testingSupport');
const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';
let civilCaseReference, gaCaseReference, user;
const claimAmountJudge = '11000';

Feature('Before SDO 1v2 - GA - Consent Orders').tag('@ui-consent-order');

Scenario('NBC admin Approve Consent Order', async ({I, api}) => {
  civilCaseReference = await api.createUnspecifiedClaim(config.applicantSolicitorUser,
    mpScenario, 'SoleTrader', '11000');
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  await api.notifyClaimDetails(config.applicantSolicitorUser, civilCaseReference);
  await api.acknowledgeClaim(config.defendantSolicitorUser, civilCaseReference, true);
  console.log('Civil Case created for general application: ' + civilCaseReference);
  await api.defendantResponseClaim(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.defendantResponseClaim(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
  await api.claimantResponseUnSpec(config.applicantSolicitorUser, mpScenario, 'JUDICIAL_REFERRAL');
  console.log('Civil Case created for general application: ' + civilCaseReference);

  console.log('Make a General Application');
  gaCaseReference = await api.initiateConsentGeneralApplication(config.secondDefendantSolicitorUser,
    civilCaseReference, ['STAY_THE_CLAIM'],false, false);

  console.log('*** Start response to GA Case Reference: ' + gaCaseReference + ' ***');
  await api.respondentConsentResponse1v2(config.applicantSolicitorUser,
    config.defendantSolicitorUser, gaCaseReference, true);
  console.log('*** End Response to GA Case Reference: ' + gaCaseReference + ' ***');

  if (config.runWAApiTest || ['demo'].includes(config.runningEnv)) {
    await api.retrieveTaskDetails(config.hearingCenterAdminWithRegionId2, gaCaseReference, config.waTaskIds.nbcUserReviewGA);
  } else {
    console.log('WA flag is not enabled');
    return;
  }

  console.log('NBC admin Approves Consent order' + gaCaseReference);
  user = config.hearingCenterAdminWithRegionId2;
  await I.login(user);

  await I.approveConsentOrder(gaCaseReference);
  await waitForGACamundaEventsFinishedBusinessProcess(gaCaseReference, states.ORDER_MADE.id, user);
  await I.verifyUploadedApplicationDocument(gaCaseReference, 'Consent Order');

  await I.navigateToApplicationsTab(civilCaseReference);
  await I.see(states.ORDER_MADE.name);

  await I.verifyUploadedClaimDocument(civilCaseReference, 'Consent order document');

  await I.verifyCaseFileOrderDocument(civilCaseReference, 'Consent Order');
  await I.verifyCaseFileAppDocument(civilCaseReference, 'Consent Order');
}).retry(1).tag('@ui-prod');

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
