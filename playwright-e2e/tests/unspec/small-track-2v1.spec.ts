import { test } from '../../playwright-fixtures/index';

test('2v1 Small Track Defendant Full Defence Claimant Intent To Proceed - Claim Journey', async ({
  ClaimantSolicitorSteps,
  DefendantSolicitor1Steps,
  ClaimantSolicitorApiSteps,
  CaseRoleAssignmentApiSteps,
}) => {
  await ClaimantSolicitorSteps.Login();
  await ClaimantSolicitorSteps.CreateClaimSmallTrack2v1();
  await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
  await ClaimantSolicitorSteps.NotifyClaim();
  await CaseRoleAssignmentApiSteps.AssignCaseRoleToDefendant1();
  await ClaimantSolicitorSteps.NotifyClaimDetails();
  await DefendantSolicitor1Steps.Login();
  await DefendantSolicitor1Steps.RespondSmallTrackFullDefence2v1();
  await ClaimantSolicitorSteps.Login();
  await ClaimantSolicitorSteps.RespondSmallClaimIntentToProceed2v1();
});
