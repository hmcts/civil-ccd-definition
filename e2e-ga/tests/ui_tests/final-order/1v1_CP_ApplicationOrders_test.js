/* eslint-disable no-unused-vars */
const config = require('../../../config.js');
const states = require('./../../../fixtures/ga-ccd/state');
const { waitForGACamundaEventsFinishedBusinessProcess } = require('./../../../api/testingSupport');
const mpScenario = 'ONE_V_ONE';
const doc = 'hearingNotice';
let civilCaseReference, gaCaseReference, user;
const judgeApproveOrderStatus = states.ORDER_MADE.name;

Feature('Before SDO 1v1 - GA CP - Applications Orders').tag('@ui-nightly-prod @ui-final-order');

Scenario('1v1 - Free form order - With notice journey', async ({ I, api }) => {
  civilCaseReference = await api.createUnspecifiedClaim(config.applicantSolicitorUser, mpScenario, 'Company', '11000');
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  await api.notifyClaimDetails(config.applicantSolicitorUser, civilCaseReference);
  await api.acknowledgeClaim(config.defendantSolicitorUser, civilCaseReference, true);
  await api.defendantResponseClaim(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.claimantResponseUnSpec(config.applicantSolicitorUser, mpScenario, 'JUDICIAL_REFERRAL');
  console.log('Civil Case created for general application: ' + civilCaseReference);
  console.log('Make a General Application');
  gaCaseReference = await api.initiateGeneralApplication(config.applicantSolicitorUser, civilCaseReference);

  console.log('*** Start response to GA Case Reference: ' + gaCaseReference + ' ***');
  await api.respondentResponse(config.defendantSolicitorUser, gaCaseReference);
  console.log('*** End Response to GA Case Reference: ' + gaCaseReference + ' ***');

  console.log('*** Start Judge List the application for hearing on GA Case Reference: ' + gaCaseReference + ' ***');
  await api.judgeListApplicationForHearing(config.judgeUser2WithRegionId2, gaCaseReference);

  console.log('Hearing Notice creation');
  await api.hearingCenterAdminScheduleHearing(config.hearingCenterAdminWithRegionId2, gaCaseReference);
  await api.assertGaDocumentVisibilityToUser(
    config.judgeUser2WithRegionId2,
    civilCaseReference,
    gaCaseReference,
    doc
  );
  console.log('Hearing Notice created for: ' + gaCaseReference);

  console.log('Judge making Free form application order for: ' + gaCaseReference);
  user = config.judgeUser2WithRegionId2;

  await I.login(user);
  await I.judgeMakeAppOrder(gaCaseReference, 'freeFromOrder', 'withoutNoticeOrder');
  await I.judgeCloseAndReturnToCaseDetails();
  await waitForGACamundaEventsFinishedBusinessProcess(gaCaseReference, states.ORDER_MADE.id, user);
  await I.verifyUploadedApplicationDocument(gaCaseReference, 'Free From Order');
  await I.navigateToApplicationsTab(civilCaseReference);
  await I.see(judgeApproveOrderStatus);
  await I.verifyUploadedClaimDocument(civilCaseReference, 'Free From Order');
  await I.verifyCaseFileOrderDocument(civilCaseReference, 'General order document');
  await I.verifyCaseFileAppDocument(civilCaseReference, 'Hearing Notice');
}).retry(1).tag('@ui-prod');

Scenario('1v1 - Assisted order - Without Further Hearing', async ({ api, I }) => {
  civilCaseReference = await api.createUnspecifiedClaim(config.applicantSolicitorUser, mpScenario, 'Company', '11000');
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  await api.notifyClaimDetails(config.applicantSolicitorUser, civilCaseReference);
  await api.acknowledgeClaim(config.defendantSolicitorUser, civilCaseReference, true);
  await api.defendantResponseClaim(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.claimantResponseUnSpec(config.applicantSolicitorUser, mpScenario, 'JUDICIAL_REFERRAL');
  console.log('Civil Case created for general application: ' + civilCaseReference);

  console.log('Make a General Application');
  gaCaseReference = await api.initiateGeneralApplication(config.applicantSolicitorUser, civilCaseReference);

  console.log('*** Start response to GA Case Reference: ' + gaCaseReference + ' ***');
  await api.respondentResponse(config.defendantSolicitorUser, gaCaseReference);
  console.log('*** End Response to GA Case Reference: ' + gaCaseReference + ' ***');

  console.log('*** Start Judge List the application for hearing on GA Case Reference: ' + gaCaseReference + ' ***');
  const doc = 'hearingNotice';

  await api.judgeListApplicationForHearing(config.judgeUser2WithRegionId2, gaCaseReference);
  console.log('*** End Judge List the application for hearing GA Case Reference: ' + gaCaseReference + ' ***');

  await api.hearingCenterAdminScheduleHearing(config.hearingCenterAdminWithRegionId2, gaCaseReference);
  await api.assertGaDocumentVisibilityToUser(
    config.judgeUser2WithRegionId2,
    civilCaseReference,
    gaCaseReference,
    doc
  );

  await api.judgeMakeFinalOrder(config.judgeUser2WithRegionId2, gaCaseReference, 'ASSISTED_ORDER', false);

  await I.login(config.judgeUser2WithRegionId2);

  await I.verifyUploadedApplicationDocument(gaCaseReference, 'Assisted Order');
  await I.navigateToApplicationsTab(civilCaseReference);
  await I.see(judgeApproveOrderStatus);
  await I.verifyUploadedClaimDocument(civilCaseReference, 'Assisted Order');
}).retry(1);

AfterSuite(async ({ api }) => {
  await api.cleanUp();
});
