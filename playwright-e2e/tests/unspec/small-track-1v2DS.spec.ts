import { test } from '../../playwright-fixtures';
import ClaimantSolicitorSpecSteps from '../../steps/ui/exui/claimant-solicitor-spec-steps.ts';

test.describe('Unspecified Small track 1v2DS', async () => {
  test('Defendant Full Defence Claimant Intent To Proceed', async ({
    ClaimantSolicitorSteps,
    DefendantSolicitor1Steps,
    DefendantSolicitor2Steps,
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
  }) => {
    await ClaimantSolicitorSteps.Login();
    await ClaimantSolicitorSteps.CreateClaimSmallTrack1v2DS();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorSteps.NotifyClaim1v2DS();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
    await ClaimantSolicitorSteps.NotifyClaimDetails1v2DS();
    await DefendantSolicitor1Steps.Login();
    await DefendantSolicitor1Steps.AddLitigationFriend();
    await DefendantSolicitor1Steps.RespondSmallTrackFullDefence1v2DS();
    await DefendantSolicitor2Steps.Login();
    await DefendantSolicitor2Steps.AddLitigationFriend();
    await DefendantSolicitor2Steps.RespondSmallTrackFullDefence1v2DS();
    await ClaimantSolicitorSteps.Login();
    await ClaimantSolicitorSteps.RespondSmallClaimIntentToProceed1v2DS();
  });

  test('Defendant Full Defence Claimant Intent To Proceed With Default Judgment', async ({
    ClaimantSolicitorSteps,
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
  }) => {
    await ClaimantSolicitorSteps.Login();
    await ClaimantSolicitorSteps.CreateClaimSmallTrack1v2DS();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorSteps.NotifyClaim1v2DS();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
    await ClaimantSolicitorSteps.NotifyClaimDetails1v2DS();
    await ClaimantSolicitorApiSteps.AmendRespondent1ResponseDeadline();
    await ClaimantSolicitorApiSteps.AmendRespondent2ResponseDeadline();
    await ClaimantSolicitorSteps.RequestDefaultJudgment1v2();
  });
});
