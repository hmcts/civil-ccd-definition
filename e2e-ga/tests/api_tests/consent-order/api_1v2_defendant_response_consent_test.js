/* eslint-disable no-unused-vars */
const config = require('../../../config.js');
const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';

let civilCaseReference, gaCaseReference;

Feature('GA 1v2 Defendants response consent order API tests').tag('@api-nightly-prod');

Scenario('Defendants response 1V2', async ({api}) => {

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
    gaCaseReference = await api.initiateConsentGeneralApplication(config.defendantSolicitorUser, civilCaseReference, ['STAY_THE_CLAIM']);

    console.log('*** Verify Collections creation in Civil Claim ***');
    await api.verifyCivilClaimGACollections(config.defendantSolicitorUser, civilCaseReference, gaCaseReference);

    console.log('*** Start response to GA Case Reference: ' + gaCaseReference + ' ***');
    await api.respondentConsentResponse1v2(config.applicantSolicitorUser, config.secondDefendantSolicitorUser, gaCaseReference, false);
    console.log('*** End Response to GA Case Reference: ' + gaCaseReference + ' ***');
    console.log('*** NBC Admin Region4 Refer to Judge Process Start ***');

  await api.nbcAdminReferToJudge(config.hearingCenterAdminWithRegionId2, gaCaseReference);
  console.log('*** NBC Admin Region4 Refer to Judge Process End ***');

}).retry(1);

AfterSuite(async ({api}) => {
    await api.cleanUp();
});

