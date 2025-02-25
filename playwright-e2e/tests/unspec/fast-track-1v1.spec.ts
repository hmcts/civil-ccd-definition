import { test } from '../../playwright-fixtures/index';

test('1v1 Fast track Defendant Full Defence Claimant Intent To Proceed - Claim Journey', async ({
  ClaimantSolicitorSteps,
  DefendantSolicitor1Steps,
  ClaimantSolicitorApiSteps,
  CaseRoleAssignmentApiSteps,
}) => {
  await ClaimantSolicitorSteps.Login();
  await ClaimantSolicitorSteps.CreateClaimFastTrack1v1();
  await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
  await ClaimantSolicitorSteps.NotifyClaim();
  await CaseRoleAssignmentApiSteps.AssignCaseRoleToDefendant1();
  await ClaimantSolicitorSteps.NotifyClaimDetails1v1();
  await DefendantSolicitor1Steps.Login();
  await DefendantSolicitor1Steps.RespondFastTrackFullDefence1v1();
  await ClaimantSolicitorSteps.Login();
  await ClaimantSolicitorSteps.RespondFastTrackIntentToProceed1v1();
});
