import { test } from '../../playwright-fixtures/index';

test('1v1 Spec Small Track Defendant Full Defence Claimant Intent To Proceed - Claim Journey', async ({
  ClaimantSolicitorSpecSteps,
  DefendantSolicitor1SpecSteps,
  ClaimantSolicitorSpecApiSteps,
  CaseRoleAssignmentApiSteps,
}) => {
  await ClaimantSolicitorSpecSteps.Login();
  await ClaimantSolicitorSpecSteps.CreateClaimSmallTrack1v2SS();
  await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
  await CaseRoleAssignmentApiSteps.AssignCaseRoleToDefendant1();
  await DefendantSolicitor1SpecSteps.Login();
  await DefendantSolicitor1SpecSteps.RespondSmallTrackFullDefence1v2SS();
  await ClaimantSolicitorSpecSteps.Login();
  await ClaimantSolicitorSpecSteps.SmallClaimIntentToProceed1v2SS();
});
