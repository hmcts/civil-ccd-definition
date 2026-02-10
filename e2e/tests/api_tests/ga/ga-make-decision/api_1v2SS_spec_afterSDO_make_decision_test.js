/* eslint-disable no-unused-vars */
const config = require('../../../config.js');
const mpScenario = 'ONE_V_TWO_SAME_SOL';

let civilCaseReference, gaCaseReference;

Feature('Spec 1v2 - General Application after SDO Journey').tag('@api-nightly-prod @api-ga-make-decision');

Scenario.skip('Spec Claimant create GA - CASE_PROGRESSION state', async ({api, I}) => {
  civilCaseReference = await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  console.log('Civil Case created for general application: ' + civilCaseReference);
  await api.defendantResponseSpecClaim(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO');
  await api.claimantResponseClaimSpec(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO',
    'JUDICIAL_REFERRAL');
  await I.wait(10);
  console.log('Civil Case created for general application: ' + civilCaseReference);

  console.log('Create SDO');
  await api.createSDO(civilCaseReference, config.judgeUser2WithRegionId2, 'CREATE_FAST');

  await I.wait(10);
  await api.scheduleCivilHearing(civilCaseReference, config.hearingCenterAdminWithRegionId2, 'FAST_TRACK_TRIAL');
  await api.amendHearingDueDate(civilCaseReference, config.systemUpdate);
  await api.hearingFeePaid(civilCaseReference, config.hearingCenterAdminWithRegionId2);
  await api.createFinalOrder(civilCaseReference, config.judgeUser2WithRegionId2, 'FREE_FORM_ORDER');
  console.log('Make a General Application');
  gaCaseReference = await api.initiateGeneralApplicationWithOutNotice(config.applicantSolicitorUser, civilCaseReference);

  await api.judgeMakesDecisionWrittenRep(config.judgeUser2WithRegionId2, gaCaseReference);
  await api.verifyGAState(config.applicantSolicitorUser, civilCaseReference, gaCaseReference, 'AWAITING_WRITTEN_REPRESENTATIONS');
}).retry(1);

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
