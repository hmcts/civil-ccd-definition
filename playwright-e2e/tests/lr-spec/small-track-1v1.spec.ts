import { test } from '../../playwright-fixtures/index';

test('1v1 Specified Small Track Defendant Full Defence Claimant Intent To Proceed - Claim Journey', async ({
  ClaimantSolicitorSpecSteps,
  DefendantSolicitor1SpecSteps,
  ClaimantSolicitorApiSteps,
  CaseRoleAssignmentApiSteps,
}) => {
  await ClaimantSolicitorSpecSteps.Login();
  await ClaimantSolicitorSpecSteps.CreateClaimSmallTrack1v1();
  await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
  await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
  await DefendantSolicitor1SpecSteps.Login();
  await DefendantSolicitor1SpecSteps.RespondSmallTrackFullDefence1v1();
  await ClaimantSolicitorSpecSteps.Login();
  await ClaimantSolicitorSpecSteps.RespondSmallClaimIntentToProceed1v1();
});
