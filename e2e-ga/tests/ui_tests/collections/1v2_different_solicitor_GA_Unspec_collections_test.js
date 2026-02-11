/* eslint-disable no-unused-vars */
const config = require('../../../config.js');
const states = require('../../../../fixtures/ga-ccd/state.js');

const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';
const respondentStatus = states.AWAITING_RESPONDENT_RESPONSE.name;
const judgeDecisionStatus = states.APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION.name;
const writtenRepStatus = states.AWAITING_WRITTEN_REPRESENTATIONS.name;
let gaCaseReference, civilCaseReference;

Feature('1v2 Different Solicitor - General Application Collections test Journey').tag('@ui-nightly-prod @ui-collections');

Scenario(
  'Without Notice application - Org2 Solicitor Initiate GA - Awaiting Written Representations',
  async ({ api, I }) => {
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

    gaCaseReference = await api.initiateGeneralApplicationWithOutNotice(
      config.defendantSolicitorUser,
      civilCaseReference
    );
    await I.login(config.defendantSolicitorUser);
    await I.navigateToApplicationsTab(civilCaseReference);
    await I.see(judgeDecisionStatus);

    await api.judgeMakesDecisionWrittenRep(config.judgeUser2WithRegionId2, gaCaseReference);

    await I.navigateToApplicationsTab(civilCaseReference);
    await I.see(writtenRepStatus);

    await api.assertGAApplicantDisplayName(config.defendantSolicitorUser, gaCaseReference);

    await api.assertGACollectionNotVisiblityToUser(config.applicantSolicitorUser, civilCaseReference, gaCaseReference);
    await api.assertGACollectionNotVisiblityToUser(
      config.secondDefendantSolicitorUser,
      civilCaseReference,
      gaCaseReference
    );
}).retry(1);

Scenario('With Notice application - Org3 Solicitor Initiate GA', async ({ api, I }) => {
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
  gaCaseReference = await api.initiateGeneralApplicationWithNoStrikeOut(
    config.secondDefendantSolicitorUser,
    civilCaseReference
  );
  await I.login(config.secondDefendantSolicitorUser);
  await I.navigateToApplicationsTab(civilCaseReference);
  await I.see(respondentStatus);

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
  await api.assertGAApplicantDisplayName(config.secondDefendantSolicitorUser, gaCaseReference);
}).retry(1);

AfterSuite(async ({ api }) => {
  await api.cleanUp();
});
