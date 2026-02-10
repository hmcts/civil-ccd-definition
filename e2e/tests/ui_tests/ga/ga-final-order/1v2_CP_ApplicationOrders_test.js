/* eslint-disable no-unused-vars */
const config = require('../../../config.js');
const states = require('../../../fixtures/ga-ccd/state');
const { waitForGACamundaEventsFinishedBusinessProcess } = require('../../../api/testingSupport');
const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';
const doc = 'hearingNotice';
const listForHearingStatus = states.LISTING_FOR_A_HEARING.name;
let civilCaseReference, gaCaseReference, user;

Feature('Before SDO 1v2 - GA CP - Applications Orders').tag('@ui-ga-nightly-prod @ui-ga-final-order');

Scenario('1v2 - Assisted order - With Further Hearing', async ({ I, api }) => {
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
  await api.defendantResponseClaim(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
  await api.claimantResponseUnSpec(config.applicantSolicitorUser, mpScenario, 'JUDICIAL_REFERRAL');
  console.log('Civil Case created for general application: ' + civilCaseReference);
  console.log('Make a General Application');
  gaCaseReference = await api.initiateGeneralApplicationWithOutNotice(
    config.applicantSolicitorUser,
    civilCaseReference
  );

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

  console.log('Judge making Assisted order for: ' + gaCaseReference);

  user = config.judgeUser2WithRegionId2;
  await I.login(user);

  await I.judgeMakeAppOrder(gaCaseReference, 'assistedOrder', 'withoutNoticeOrder');
  await I.judgeCloseAndReturnToCaseDetails();
  await waitForGACamundaEventsFinishedBusinessProcess(gaCaseReference, states.LISTING_FOR_A_HEARING.id, user);

  await I.verifyUploadedApplicationDocument(gaCaseReference, 'Assisted Order');

  await I.navigateToApplicationsTab(civilCaseReference);
  await I.see(listForHearingStatus);

  await I.verifyUploadedClaimDocument(civilCaseReference, 'Assisted Order');

  await I.verifyCaseFileOrderDocument(civilCaseReference, 'General order document');
  await I.verifyCaseFileAppDocument(civilCaseReference, 'Hearing Notice');
}).retry(1).tag('@ui-ga-prod');

AfterSuite(async ({ api }) => {
  await api.cleanUp();
});
