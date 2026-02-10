/* eslint-disable no-unused-vars */
const config = require('../../../config.js');
const states = require('../../../fixtures/ga-ccd/state.js');

const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';
const respondentStatus = states.AWAITING_RESPONDENT_RESPONSE.name;
const judgeDecisionStatus = states.APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION.name;
const listForHearingStatus = states.LISTING_FOR_A_HEARING.name;
const judgeDirectionsOrderStatus = states.AWAITING_DIRECTIONS_ORDER_DOCS.name;
let gaCaseReference, civilCaseReference;

Feature('1v2 Different Solicitor - General Application Journey').tag('@ui-ga-nightly-prod @ui-ga-notice');

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

Scenario('Without Notice application for a hearing', async ({ api, I }) => {
  gaCaseReference = await api.initiateGeneralApplicationWithOutNotice(
    config.applicantSolicitorUser,
    civilCaseReference
  );
  await api.judgeListApplicationForHearing(config.judgeUser2WithRegionId2, gaCaseReference);

  await I.login(config.applicantSolicitorUser);
  await I.navigateToApplicationsTab(civilCaseReference);
  await I.see(listForHearingStatus);

  await api.assertGaAppCollectionVisiblityToUser(
    config.defendantSolicitorUser,
    civilCaseReference,
    gaCaseReference,
    null
  );
  await api.assertGaAppCollectionVisiblityToUser(
    config.secondDefendantSolicitorUser,
    civilCaseReference,
    gaCaseReference,
    null
  );
}).retry(1);

Scenario('With Notice application - Org2 Solicitor Initiate GA', async ({ api, I }) => {
  gaCaseReference = await api.initiateGeneralApplicationWithNoStrikeOut(
    config.defendantSolicitorUser,
    civilCaseReference
  );
  await I.login(config.defendantSolicitorUser);
  await I.navigateToApplicationsTab(civilCaseReference);
  await I.see(respondentStatus);

  await api.verifyGAState(
    config.applicantSolicitorUser,
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
  await api.assertGaAppCollectionVisiblityToUser(
    config.applicantSolicitorUser,
    civilCaseReference,
    gaCaseReference,
    'Y'
  );
  await api.assertGaAppCollectionVisiblityToUser(
    config.secondDefendantSolicitorUser,
    civilCaseReference,
    gaCaseReference,
    'Y'
  );
  await api.assertGAApplicantDisplayName(config.defendantSolicitorUser, gaCaseReference);
}).retry(1);

AfterSuite(async ({ api }) => {
  await api.cleanUp();
});
