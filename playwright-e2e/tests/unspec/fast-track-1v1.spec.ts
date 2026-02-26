import { test } from '../../playwright-fixtures/index';

test.describe('Unspecified Fast track 1v1', async () => {
  test('Defendant Full Defence Claimant Intent To Proceed', async ({
    ClaimantSolicitorSteps,
    DefendantSolicitor1Steps,
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
    HearingCenterAdminSteps,
    JudgeSteps
  }) => {
    await ClaimantSolicitorSteps.Login();
    await ClaimantSolicitorSteps.CreateClaimFastTrack1v1();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorSteps.NotifyClaim();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorSteps.NotifyClaimDetails();
    await DefendantSolicitor1Steps.Login();
    await DefendantSolicitor1Steps.AcknowledgeClaimFullDefence();
    await DefendantSolicitor1Steps.AddLitigationFriend();
    await DefendantSolicitor1Steps.RespondFastTrackFullDefence1v1();
    await ClaimantSolicitorSteps.Login();
    await ClaimantSolicitorSteps.RespondFastTrackIntentToProceed1v1();
    await JudgeSteps.Login();
    await JudgeSteps.SdoFastTrackNIHL();
    await HearingCenterAdminSteps.LoginRegion1();
    await HearingCenterAdminSteps.CreateCaseLevelCaseFlag();
    await HearingCenterAdminSteps.CreateClaimant1CaseFlag();
    await HearingCenterAdminSteps.ManageCaseFlags();
  });
});
