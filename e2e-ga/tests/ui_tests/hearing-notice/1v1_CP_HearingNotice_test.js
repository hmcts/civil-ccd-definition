/* eslint-disable no-unused-vars */
const config = require('../../../config.js');
const { waitForGACamundaEventsFinishedBusinessProcess } = require('./../../../api/testingSupport');
const states = require('./../../../fixtures/ga-ccd/state');
const listForHearingStatus = states.LISTING_FOR_A_HEARING.name;
const hnStatus = states.HEARING_SCHEDULED.name;
const mpScenario = 'ONE_V_ONE';
let civilCaseReference, gaCaseReference;

Feature('Before SDO 1v1 - GA CP - Hearing Notice document').tag('@ui-nightly-prod @ui-hearing-notice');

BeforeSuite(async ({ api }) => {
  civilCaseReference = await api.createUnspecifiedClaim(
    config.applicantSolicitorUser,
    mpScenario,
    'SoleTrader',
    '11000'
  );
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  await api.notifyClaimDetails(config.applicantSolicitorUser, civilCaseReference);
  await api.acknowledgeClaim(config.defendantSolicitorUser, civilCaseReference, true);
  console.log('Civil Case created for general application: ' + civilCaseReference);
  await api.defendantResponseClaim(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.claimantResponseUnSpec(config.applicantSolicitorUser, mpScenario, 'JUDICIAL_REFERRAL');
  console.log('Civil Case created for general application: ' + civilCaseReference);
});

Scenario('Claimant and Defendant Hearing notice - With notice journey', async ({ I, api }) => {
  console.log('Make a General Application');
  gaCaseReference = await api.initiateGeneralApplication(config.applicantSolicitorUser, civilCaseReference);

  console.log('*** Start response to GA Case Reference: ' + gaCaseReference + ' ***');
  await api.respondentResponse(config.defendantSolicitorUser, gaCaseReference);
  console.log('*** End Response to GA Case Reference: ' + gaCaseReference + ' ***');

  console.log('*** Start Judge List the application for hearing on GA Case Reference: ' + gaCaseReference + ' ***');

  await api.judgeListApplicationForHearing(config.judgeUser2WithRegionId2, gaCaseReference);

  console.log('Hearing Notice creation');
  await I.login(config.hearingCenterAdminWithRegionId2);
  await I.navigateToApplicationsTab(civilCaseReference);
  await I.see(listForHearingStatus);
  await I.navigateToHearingNoticePage(gaCaseReference);
  await I.fillHearingNotice(gaCaseReference, 'claimAndDef', 'basildon', 'VIDEO');
  await waitForGACamundaEventsFinishedBusinessProcess(
    gaCaseReference,
    states.HEARING_SCHEDULED.id,
    config.hearingCenterAdminWithRegionId2
  );
  console.log('Hearing Notice created for: ' + gaCaseReference);
  await I.click('Close and Return to case details');
  await I.verifyUploadedApplicationDocument(gaCaseReference, 'Hearing Notice');
  await I.navigateToApplicationsTab(civilCaseReference);
  await I.see(hnStatus);
  await I.verifyUploadedClaimDocument(civilCaseReference, 'Hearing Notice');

  await I.login(config.applicantSolicitorUser);
  await I.verifyUploadedClaimDocument(civilCaseReference, 'Hearing Notice');
  await I.verifyUploadedApplicationDocument(gaCaseReference, 'Hearing Notice');

  await I.login(config.defendantSolicitorUser);
  await I.verifyUploadedClaimDocument(civilCaseReference, 'Hearing Notice');
  await I.verifyUploadedApplicationDocument(gaCaseReference, 'Hearing Notice');

  await api.assertGaAppCollectionVisiblityToUser(
    config.hearingCenterAdminWithRegionId2,
    civilCaseReference,
    gaCaseReference,
    'Y'
  );
  await api.assertGaAppCollectionVisiblityToUser(
    config.judgeUser2WithRegionId2,
    civilCaseReference,
    gaCaseReference,
    'Y'
  );

  await api.assertGaAppCollectionVisiblityToUser(
    config.applicantSolicitorUser,
    civilCaseReference,
    gaCaseReference,
    'Y'
  );
  await api.assertGaAppCollectionVisiblityToUser(
    config.defendantSolicitorUser,
    civilCaseReference,
    gaCaseReference,
    'Y'
  );
}).retry(1);

AfterSuite(async ({ api }) => {
  await api.cleanUp();
});
