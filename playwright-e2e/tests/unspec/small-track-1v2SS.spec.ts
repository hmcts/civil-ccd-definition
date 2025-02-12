import { test } from '../../playwright-fixtures/index';

test('1v1 Small Track Defendant Full Defence Claimant Intent To Proceed - Claim Journey', async ({
  ClaimantSolicitorSteps,
  DefendantSolicitor1Steps,
  ClaimantSolicitorApiSteps,
  CaseRoleAssignmentApiSteps,
}) => {
  await ClaimantSolicitorSteps.Login();
  await ClaimantSolicitorSteps.CreateClaimSmallTrack1v2SS();
  await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
  await ClaimantSolicitorSteps.NotifyClaim1v2SS();
  await CaseRoleAssignmentApiSteps.AssignCaseRoleToDefendant1();
  await ClaimantSolicitorSteps.NotifyClaimDetails1v2SS();
  await DefendantSolicitor1Steps.Login();
  await DefendantSolicitor1Steps.RespondSmallTrackFullDefence1v2SS();
  await ClaimantSolicitorSteps.Login();
  await ClaimantSolicitorSteps.RespondSmallClaimIntentToProceed1v2SS();
});
