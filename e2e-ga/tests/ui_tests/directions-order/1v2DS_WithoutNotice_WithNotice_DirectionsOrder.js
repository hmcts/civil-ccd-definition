/* eslint-disable no-unused-vars */
const config = require('../../../config.js');
const states = require('../../../fixtures/ga-ccd/state.js');

const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';
const judgeDecisionStatus = states.APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION.name;
let gaCaseReference, civilCaseReference;

Feature('1v2 Different Solicitor - General Application Journey').tag('@ui-nightly-prod @ui-directions-order');

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
  await api.defendantResponseClaim(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
  await api.claimantResponseUnSpec(config.applicantSolicitorUser, mpScenario, 'JUDICIAL_REFERRAL');
});


Scenario('Without Notice application to With Notice application - Directions Order', async ({ api, I }) => {
  gaCaseReference = await api.initiateGeneralApplicationWithOutNotice(
    config.secondDefendantSolicitorUser,
    civilCaseReference
  );
  await I.login(config.secondDefendantSolicitorUser);
  await I.navigateToApplicationsTab(civilCaseReference);
  await I.see(judgeDecisionStatus);
  await api.assertGaAppCollectionVisiblityToUser(
    config.applicantSolicitorUser,
    civilCaseReference,
    gaCaseReference,
    null
  );
  await api.assertGaAppCollectionVisiblityToUser(
    config.defendantSolicitorUser,
    civilCaseReference,
    gaCaseReference,
    null
  );

  await api.judgeRequestMoreInformationUncloak(config.judgeUser2WithRegionId2, gaCaseReference, true, true);

  await api.additionalPaymentSuccess(
    config.secondDefendantSolicitorUser,
    gaCaseReference,
    states.AWAITING_RESPONDENT_RESPONSE.id
  );

  await api.verifyGAState(
    config.applicantSolicitorUser,
    civilCaseReference,
    gaCaseReference,
    states.AWAITING_RESPONDENT_RESPONSE.id
  );
  await api.verifyGAState(
    config.defendantSolicitorUser,
    civilCaseReference,
    gaCaseReference,
    states.AWAITING_RESPONDENT_RESPONSE.id
  );
  await api.verifyGAState(
    config.secondDefendantSolicitorUser,
    civilCaseReference,
    gaCaseReference,
    states.AWAITING_RESPONDENT_RESPONSE.id
  );

  await api.respondentResponse1v2(config.defendantSolicitorUser, config.applicantSolicitorUser, gaCaseReference);

  await api.judgeMakesDecisionDirectionsOrder(config.judgeUser2WithRegionId2, gaCaseReference);

  await api.verifyGAState(
    config.defendantSolicitorUser,
    civilCaseReference,
    gaCaseReference,
    states.AWAITING_DIRECTIONS_ORDER_DOCS.id
  );
  await api.verifyGAState(
    config.applicantSolicitorUser,
    civilCaseReference,
    gaCaseReference,
    states.AWAITING_DIRECTIONS_ORDER_DOCS.id
  );
  await api.verifyGAState(
    config.secondDefendantSolicitorUser,
    civilCaseReference,
    gaCaseReference,
    states.AWAITING_DIRECTIONS_ORDER_DOCS.id
  );
}).retry(1);