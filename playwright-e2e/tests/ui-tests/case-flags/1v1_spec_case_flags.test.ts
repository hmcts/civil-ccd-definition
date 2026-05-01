import { test } from '../../../playwright-fixtures/index';

test.describe('1v1 case flags journey', { tag: '@civil-ccd-nightly' }, 
  async () => {
    test('1v1 case flags journey', async ({
      ClaimantSolicitorSpecApiSteps, 
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecSteps,
      HearingCenterAdminSteps,
      HearingCenterAdminSpecSteps
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmallTrack1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecSteps.RespondSmallTrackFullDefence1v1();
      await ClaimantSolicitorSpecApiSteps.RespondSmallClaimIntentToProceed1v1();
      await HearingCenterAdminSpecSteps.LoginRegion1();
      await HearingCenterAdminSteps.CreateCaseLevelCaseFlag();
      await HearingCenterAdminSteps.CreateClaimant1CaseFlag();
    });
});
