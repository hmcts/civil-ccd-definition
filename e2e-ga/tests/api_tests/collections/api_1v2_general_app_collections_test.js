/* eslint-disable no-unused-vars */
const config = require('../../../config.js');
const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';

let civilCaseReference, gaCaseReference;

Feature('GA 1v2 application collection for different solicitor API tests').tag('@api-nightly-prod @api-collections');


Scenario('GA 1v2  - Without Notice Application Collection After Judge Makes Decision List for Hearing', async ({api}) => {

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
  gaCaseReference = await api.initiateGeneralApplicationWithOutNotice(config.applicantSolicitorUser, civilCaseReference);
  console.log('Without Notice General Application Initiated by Claimant : ' + gaCaseReference);

  console.log('*** Start Judge makes decision List for Hearing: ' + gaCaseReference + ' ***');

  await api.judgeListApplicationForHearing(config.judgeUser2WithRegionId2, gaCaseReference);
  await api.assertGaAppCollectionVisiblityToUser(config.judgeUser2WithRegionId2, civilCaseReference, gaCaseReference, 'Y');
  console.log('*** End Judge makes decision - GA Case Reference: ' + gaCaseReference + ' ***');

  console.log('*** Start  GA Case Visibility in all Collections: ' + gaCaseReference + ' ***');
  await api.assertGaAppCollectionVisiblityToUser(config.applicantSolicitorUser, civilCaseReference, gaCaseReference, 'Y');
  await api.assertGaAppCollectionVisiblityToUser(config.defendantSolicitorUser, civilCaseReference, gaCaseReference, null);
  await api.assertGaAppCollectionVisiblityToUser(config.secondDefendantSolicitorUser, civilCaseReference, gaCaseReference, null);

  console.log('*** End of Validating  GA Case Visibility in all Collections: ' + gaCaseReference + ' ***');

}).retry(1).tag('@api-prod @ui-prod');

Scenario('GA 1v2  - Without Notice Application Collection after Creation of GA Case Test', async ({api}) => {

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
  gaCaseReference = await api.initiateGeneralApplicationWithOutNotice(config.applicantSolicitorUser, civilCaseReference);
  console.log('Without Notice General Application Initiated by Claimant : ' + gaCaseReference);

  console.log('*** Start  GA Case Visibility in all Collections: ' + gaCaseReference + ' ***');
  await api.assertGaAppCollectionVisiblityToUser(config.applicantSolicitorUser, civilCaseReference, gaCaseReference, 'Y');
  await api.assertGaAppCollectionVisiblityToUser(config.defendantSolicitorUser, civilCaseReference, gaCaseReference, null);
  await api.assertGaAppCollectionVisiblityToUser(config.secondDefendantSolicitorUser, civilCaseReference, gaCaseReference, null);
  console.log('*** End of Validating  GA Case Visibility in all Collections: ' + gaCaseReference + ' ***');

}).retry(1);

Scenario('GA 1v2  - Without Notice Application Collection after Creation of GA Case initiated by Defendant2', async ({api}) => {

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
  gaCaseReference = await api.initiateGeneralApplicationWithOutNotice(config.secondDefendantSolicitorUser, civilCaseReference);
  console.log('Without Notice General Application Initiated by Defendant2 : ' + gaCaseReference);

  console.log('*** Start  GA Case Visibility in all Collections: ' + gaCaseReference + ' ***');
  await api.assertGaAppCollectionVisiblityToUser(config.applicantSolicitorUser, civilCaseReference, gaCaseReference, null);
  await api.assertGaAppCollectionVisiblityToUser(config.defendantSolicitorUser, civilCaseReference, gaCaseReference, null);
  await api.assertGaAppCollectionVisiblityToUser(config.secondDefendantSolicitorUser, civilCaseReference, gaCaseReference, 'Y');
  console.log('*** End of Validating  GA Case Visibility in all Collections: ' + gaCaseReference + ' ***');
  console.log('*** Start Judge Make Decision on GA Case Reference: ' + gaCaseReference + ' ***');

  await api.judgeMakesDecisionAdditionalInformation(config.judgeUser2WithRegionId2, gaCaseReference);
  console.log('*** End Judge Make Decision GA Case Reference: ' + gaCaseReference + ' ***');

  console.log('*** Start Respondent respond to Judge Additional information on GA Case Reference: '
              + gaCaseReference + ' ***');
  await api.respondentResponseToJudgeAdditionalInfo(config.secondDefendantSolicitorUser, gaCaseReference);
  console.log('*** End Respondent respond to Judge Additional information on GA Case Reference: '
              + gaCaseReference + ' ***');
  let doc = 'gaAddl';
  await api.assertNullGaDocumentVisibilityToUser(config.applicantSolicitorUser, civilCaseReference, doc);
  await api.assertNullGaDocumentVisibilityToUser(config.defendantSolicitorUser, civilCaseReference, doc);

  await api.assertDocumentVisibilityToUser(config.judgeUser2WithRegionId2, 'Staff', civilCaseReference, gaCaseReference, doc);
  await api.assertDocumentVisibilityToUser(config.secondDefendantSolicitorUser, 'Claimant', civilCaseReference, gaCaseReference, doc);
}).retry(1);

Scenario('GA 1v2  - Without Notice Application Collection after Judge Makes Decision Order Made', async ({api}) => {

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
  gaCaseReference = await api.initiateGeneralApplicationWithOutNotice(config.secondDefendantSolicitorUser, civilCaseReference);
  console.log('Without Notice General Application Initiated by Defendant2 : ' + gaCaseReference);

  const doc = 'generalOrder';
  console.log('*** Start Judge makes decision order made: ' + gaCaseReference + ' ***');

  await api.judgeMakesDecisionOrderMade(config.judgeUser2WithRegionId2, gaCaseReference);
  await api.assertGaDocumentVisibilityToUser(config.judgeUser2WithRegionId2, civilCaseReference, gaCaseReference, doc);
  console.log('*** End Judge makes decision order made - GA Case Reference: ' + gaCaseReference + ' ***');

  console.log('*** Start GA Case Visibility in all Collections: ' + gaCaseReference + ' ***');
  await api.assertGaAppCollectionVisiblityToUser(config.applicantSolicitorUser, civilCaseReference, gaCaseReference, null);
  await api.assertGaDocumentVisibilityToUser(config.applicantSolicitorUser, civilCaseReference, gaCaseReference, doc);
  await api.assertGaAppCollectionVisiblityToUser(config.defendantSolicitorUser, civilCaseReference, gaCaseReference, null);
  await api.assertGaDocumentVisibilityToUser(config.defendantSolicitorUser, civilCaseReference, gaCaseReference, doc);
  await api.assertGaAppCollectionVisiblityToUser(config.secondDefendantSolicitorUser, civilCaseReference, gaCaseReference, 'Y');
  await api.assertGaDocumentVisibilityToUser(config.secondDefendantSolicitorUser, civilCaseReference, gaCaseReference, doc);
  console.log('*** End of Validating  GA Case Visibility in all Collections: ' + gaCaseReference + ' ***');
}).retry(1);

AfterSuite(async ({api}) => {
  await api.cleanUp();
});

