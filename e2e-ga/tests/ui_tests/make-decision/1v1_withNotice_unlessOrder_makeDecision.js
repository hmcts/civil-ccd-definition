/* eslint-disable no-unused-vars */
const config = require('../../../config.js');
const { waitForGACamundaEventsFinishedBusinessProcess } = require('./../../../api/testingSupport');
const { getAppTypes } = require('./../../../pages/generalApplication/generalApplicationTypes');
const states = require('./../../../fixtures/ga-ccd/state.js');

const mpScenario = 'ONE_V_ONE';
const awaitingPaymentStatus = states.AWAITING_APPLICATION_PAYMENT.name;
const respondentStatus = states.AWAITING_RESPONDENT_RESPONSE.name;
let civilCaseReference, gaCaseReference, user;

Feature('1v1 - With Notice - Unless order - Make a decision journey').tag('@ui-nightly-prod @ui-make-decision');

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

Scenario.skip('1v1 - With Notice - Unless order - Make a decision journey', async ({ I, api }) => {
  await I.login(config.applicantSolicitorUser);
  await I.createGeneralApplication(
    getAppTypes().slice(9, 10),
    civilCaseReference,
    'no',
    'no',
    'yes',
    'no',
    'no',
    'no',
    'disabledAccess'
  );
  gaCaseReference = await api.getGACaseReference(config.applicantSolicitorUser, civilCaseReference);
  await waitForGACamundaEventsFinishedBusinessProcess(
    gaCaseReference,
    states.AWAITING_APPLICATION_PAYMENT.id,
    config.applicantSolicitorUser
  );
  await I.clickAndVerifyTab(civilCaseReference, 'Applications', getAppTypes().slice(9, 10), 1);
  await I.see(awaitingPaymentStatus);
  await I.payAndVerifyGAStatus(
    civilCaseReference,
    gaCaseReference,
    states.AWAITING_RESPONDENT_RESPONSE.id,
    config.applicantSolicitorUser,
    respondentStatus
  );

  await api.respondentResponse(config.defendantSolicitorUser, gaCaseReference);

  await api.judgeMakesDecisionOrderMade(config.judgeUser2WithRegionId2, gaCaseReference);

  await api.verifyGAState(config.applicantSolicitorUser, civilCaseReference, gaCaseReference, states.ORDER_MADE.id);
}).retry(1);

AfterSuite(async ({ api }) => {
  await api.cleanUp();
});
