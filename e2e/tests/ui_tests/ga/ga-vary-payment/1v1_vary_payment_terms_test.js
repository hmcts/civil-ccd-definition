/* eslint-disable no-unused-vars */
const config = require('../../../config.js');
const { waitForGACamundaEventsFinishedBusinessProcess } = require('./../../../api/testingSupport');
const { getAppTypes } = require('./../../../pages/generalApplication/generalApplicationTypes');
const states = require('./../../../fixtures/ga-ccd/state.js');

const mpScenario = 'ONE_V_ONE';
const awaitingPaymentStatus = states.AWAITING_APPLICATION_PAYMENT.name;
const respondentStatus = states.AWAITING_RESPONDENT_RESPONSE.name;
let civilCaseReference, gaCaseReference, user;

Feature('GA 1v1 Vary Payment Terms of Judgment - General Application Journey').tag('@ui-ga-nightly-prod @ui-ga-vary-payment');

BeforeSuite(async ({ api }) => {
  civilCaseReference = await api.createUnspecifiedClaim(config.applicantSolicitorUser, mpScenario, 'Company', '11000');
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  await api.notifyClaimDetails(config.applicantSolicitorUser, civilCaseReference);
  await api.acknowledgeClaim(config.defendantSolicitorUser, civilCaseReference, true);
  await api.defendantResponseClaim(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.claimantResponseUnSpec(config.applicantSolicitorUser, mpScenario, 'JUDICIAL_REFERRAL');
  console.log('Case created for general application: ' + civilCaseReference);
});

Scenario.skip(
  'Defendant of main claim initiates Vary payment terms of judgment application',
  async ({ I, api }) => {
    await I.login(config.applicantSolicitorUser);
    await I.verifyNoN245Form(civilCaseReference, getAppTypes().slice(10, 11), 'no');
    await I.login(config.defendantSolicitorUser);
    await I.initiateVaryJudgementGA(civilCaseReference, getAppTypes().slice(10, 11), 'yes', 'no', 'no');
    gaCaseReference = await api.getGACaseReference(config.defendantSolicitorUser, civilCaseReference);
    await waitForGACamundaEventsFinishedBusinessProcess(
      gaCaseReference,
      states.AWAITING_APPLICATION_PAYMENT.id,
      config.defendantSolicitorUser
    );
    await I.clickAndVerifyTab(civilCaseReference, 'Applications', getAppTypes().slice(10, 11), 1);
    await I.see(awaitingPaymentStatus);
    await I.navigateToTab(gaCaseReference, 'Application');
    await I.verifyN245FormElements();
    await I.clickOnTab('Application Documents');
    await I.verifyN245FormElements();

    user = config.judgeUser2WithRegionId2;
    await I.login(user);

    await I.verifyCaseFileAppDocument(civilCaseReference, 'N245 and supporting evidence');
    await I.login(config.applicantSolicitorUser);
    await I.verifyCaseFileAppDocument(civilCaseReference, 'No document');

    await I.payAndVerifyGAStatus(
      civilCaseReference,
      gaCaseReference,
      states.AWAITING_RESPONDENT_RESPONSE.id,
      config.defendantSolicitorUser,
      respondentStatus
    );

    await I.respondToVaryJudgementApp(gaCaseReference, getAppTypes().slice(10, 11), 'doNotAccept', 'fullPayment');
    await I.respCloseAndReturnToCaseDetails();
    await waitForGACamundaEventsFinishedBusinessProcess(
      gaCaseReference,
      states.APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION.id,
      config.applicantSolicitorUser
    );

    await api.judgeListApplicationForHearing(user, gaCaseReference);
    await api.verifyGAState(
      config.defendantSolicitorUser,
      civilCaseReference,
      gaCaseReference,
      'LISTING_FOR_A_HEARING'
    );
    await api.verifyGAState(
      config.applicantSolicitorUser,
      civilCaseReference,
      gaCaseReference,
      'LISTING_FOR_A_HEARING'
    );
    await api.assertGaAppCollectionVisiblityToUser(
      config.defendantSolicitorUser,
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

    await I.navigateToTab(civilCaseReference, 'Applications');
    await I.see(states.LISTING_FOR_A_HEARING.name);
    await I.verifyCaseFileAppDocument(civilCaseReference, 'N245 Evidence');
}).retry(1);

AfterSuite(async ({ api }) => {
  await api.cleanUp();
});