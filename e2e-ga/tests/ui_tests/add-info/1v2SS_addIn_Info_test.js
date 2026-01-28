/* eslint-disable no-unused-vars */
const config = require('../../../config.js');
const {waitForGACamundaEventsFinishedBusinessProcess} = require('../../../api/testingSupport');
const {getAppTypes} = require('../../../pages/generalApplication/generalApplicationTypes');
const states = require('../../../fixtures/ga-ccd/state');

const mpScenario = 'ONE_V_TWO_ONE_LEGAL_REP';
const respondentStatus = states.AWAITING_RESPONDENT_RESPONSE.name;
const judgeDecisionStatus = states.APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION.name;
const additionalPaymentStatus = states.APPLICATION_ADD_PAYMENT.name;
const awaitingPaymentStatus = states.AWAITING_APPLICATION_PAYMENT.name;
let civilCaseReference, gaCaseReference, user;

Feature('GA CCD 1v2 Same Solicitor - General Application Journey').tag('@ui-add-info');

BeforeSuite(async ({api}) => {
  civilCaseReference = await api.createUnspecifiedClaim(config.applicantSolicitorUser,
    mpScenario, 'SoleTrader', '11000');
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  await api.notifyClaimDetails(config.applicantSolicitorUser, civilCaseReference);
  await api.acknowledgeClaim(config.defendantSolicitorUser, mpScenario, true);
  console.log('Civil Case created for general application: ' + civilCaseReference);
  await api.defendantResponseClaim(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.claimantResponseUnSpec(config.applicantSolicitorUser, mpScenario, 'JUDICIAL_REFERRAL');
});

Scenario('GA for 1v2 Same Solicitor - Send application to other party journey',
  async ({I, api}) => {
    await I.login(config.applicantSolicitorUser);
    await I.navigateToCaseDetails(civilCaseReference);
    await I.createGeneralApplication(
      getAppTypes().slice(0, 5),
      civilCaseReference,
      'no', 'no', 'no', 'yes', 'yes', 'no',
      'signLanguageInterpreter');
    console.log('General Application created: ' + civilCaseReference);
    gaCaseReference = await api.getGACaseReference(config.applicantSolicitorUser, civilCaseReference);
    await waitForGACamundaEventsFinishedBusinessProcess(gaCaseReference, states.AWAITING_APPLICATION_PAYMENT.id, config.applicantSolicitorUser);
    await I.clickAndVerifyTab(civilCaseReference, 'Applications', getAppTypes().slice(0, 5), 2);
    await I.see(awaitingPaymentStatus);
    await I.payAndVerifyGAStatus(civilCaseReference, gaCaseReference,
      states.APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION.id, config.applicantSolicitorUser, judgeDecisionStatus);

    console.log('Judge Making decision:' + gaCaseReference);

  user = config.judgeUser;
  await I.login(user);
  await I.judgeRequestMoreInfo('requestMoreInfo', 'sendApplicationToOtherParty', gaCaseReference, 'no', 'sendApplicationToOtherParty');
    await waitForGACamundaEventsFinishedBusinessProcess(gaCaseReference, states.APPLICATION_ADD_PAYMENT.id, config.applicantSolicitorUser);
    await I.judgeCloseAndReturnToCaseDetails();
    await I.verifyJudgesSummaryPage('Send application to other party', 'no', 'Claimant');
    console.log('Judges sent application to other party and requested hearing details on case: ' + gaCaseReference);

    await I.login(config.applicantSolicitorUser);
    await I.navigateToTab(civilCaseReference, 'Applications');
    await I.see(additionalPaymentStatus);
    await api.additionalPaymentSuccess(config.applicantSolicitorUser, gaCaseReference, states.AWAITING_RESPONDENT_RESPONSE.id);
    await I.navigateToTab(civilCaseReference, 'Applications');
    await I.see(respondentStatus);

    await I.login(config.defendantSolicitorUser);
    await I.respondToApplication(gaCaseReference, 'yes', 'yes', 'yes', 'yes', 'no',
      'signLanguageInterpreter', getAppTypes().slice(0, 5));
    console.log('Defendant Solicitor responded to application: ' + gaCaseReference);
    await waitForGACamundaEventsFinishedBusinessProcess(gaCaseReference,
      states.APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION.id, config.defendantSolicitorUser);
    await I.navigateToTab(civilCaseReference, 'Applications');
    await I.see(judgeDecisionStatus);


  await I.login(config.judgeUser);
  await I.judgeRequestMoreInfo('requestMoreInfo', 'requestMoreInformation', gaCaseReference, 'yes', 'Request_for_information');
    await waitForGACamundaEventsFinishedBusinessProcess(gaCaseReference, states.AWAITING_ADDITIONAL_INFORMATION.id, config.applicantSolicitorUser);
    console.log('Judges requested more information on case: ' + gaCaseReference);
    await api.verifyGAState(config.applicantSolicitorUser, civilCaseReference, gaCaseReference, states.AWAITING_ADDITIONAL_INFORMATION.id);
    await api.verifyGAState(config.defendantSolicitorUser, civilCaseReference, gaCaseReference, states.AWAITING_ADDITIONAL_INFORMATION.id);

    await I.verifyCaseFileAppDocument(civilCaseReference, 'Request more info order');
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});