import { test } from '../../../playwright-fixtures/index';

test.describe('1v2 spec small case progression', { tag: '@civil-ccd-nightly' }, () => {
  test('1v2 spec small case progression', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecSteps,
    DefendantSolicitor2SpecSteps,
    JudgeSteps,
    ClaimantSolicitorSpecSteps,
    HearingCenterAdminSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFastTrack1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
    await DefendantSolicitor1SpecSteps.Login();
    await DefendantSolicitor1SpecSteps.RespondFastTrackFullDefence1v2DS();
    await DefendantSolicitor2SpecSteps.Login();
    await DefendantSolicitor2SpecSteps.RespondFastTrackFullDefence1v2DS();
    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.RespondFastTrackIntentToProceed1v2DS();
    await JudgeSteps.Login();
    await JudgeSteps.SdoSmallTrackFromFastTrackClaim();
    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.EvidenceUploadSmallClaim();
    await DefendantSolicitor1SpecSteps.Login();
    await DefendantSolicitor1SpecSteps.EvidenceUploadSmallClaim();
    await HearingCenterAdminSteps.LoginRegion1();
    await HearingCenterAdminSteps.ScheduleHearingSmallClaim();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForHearingFee();
  });
});
