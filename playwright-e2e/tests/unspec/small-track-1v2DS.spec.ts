import { test } from '../../playwright-fixtures';

test('1v2DS Small track Defendant Full Defence Claimant Intent To Proceed - Claim Journey', async ({
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
  await CaseRoleAssignmentApiSteps.AssignCaseRoleToDefendant1();
  await CaseRoleAssignmentApiSteps.AssignCaseRoleToDefendant2();
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
