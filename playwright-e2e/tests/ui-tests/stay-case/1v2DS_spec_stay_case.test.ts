import { test } from '../../../playwright-fixtures/index';

test.describe('1v2DS spec stay case journey', { tag: '@civil-ccd-nightly' }, async () => {
  test('1v2DS spec stay case journey', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecSteps,
    DefendantSolicitor2SpecSteps,
    ClaimantSolicitorSpecSteps,
    HearingCenterAdminSpecSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmallTrack1v2DS();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();

    await DefendantSolicitor1SpecSteps.Login();
    await DefendantSolicitor1SpecSteps.RespondSmallTrackFullDefence1v2DS();

    await DefendantSolicitor2SpecSteps.Login();
    await DefendantSolicitor2SpecSteps.RespondSmallTrackFullDefence1v2DS();

    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.RespondSmallClaimIntentToProceed1v2DS();

    await HearingCenterAdminSpecSteps.LoginRegion1();
    await HearingCenterAdminSpecSteps.StayCase();
    await HearingCenterAdminSpecSteps.ManageStayRequestUpdate();
    await HearingCenterAdminSpecSteps.ManageStayLiftStayJudicialReferralInMediation();
  });
});
