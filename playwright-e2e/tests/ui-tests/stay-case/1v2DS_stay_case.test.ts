import { test } from '../../../playwright-fixtures/index';

test.describe('1v2DS stay case journey', { tag: '@civil-ccd-nightly' }, () => {
  test('1v2DS stay case journey', async ({
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1Steps,
    DefendantSolicitor2Steps,
    ClaimantSolicitorSteps,
    HearingCenterAdminSteps,
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaimFastTrack1v2DS();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
    await ClaimantSolicitorApiSteps.NotifyClaim();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails();
    await DefendantSolicitor1Steps.Login();
    await DefendantSolicitor1Steps.RespondFastTrackFullDefence1v2DS();
    await DefendantSolicitor2Steps.Login();
    await DefendantSolicitor2Steps.RespondFastTrackFullDefence1v2DS();
    await ClaimantSolicitorSteps.Login();
    await ClaimantSolicitorSteps.RespondFastTrackFullDefence1v2DS();
    await DefendantSolicitor2Steps.Login();
    await DefendantSolicitor2Steps.AddUnavailableDates();
    await HearingCenterAdminSteps.LoginRegion1();
    await HearingCenterAdminSteps.StayCase();
    await HearingCenterAdminSteps.ManageStayRequestUpdate();
    await HearingCenterAdminSteps.ManageStayLiftStayJudicialReferralInMediation();
  });
});
