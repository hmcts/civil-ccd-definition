import { test } from '../../playwright-fixtures/index';

test('2v1 Specified Small Track Defendant Full Defence Claimant Intent To Proceed - Claim Journey', async ({
  ClaimantSolicitorSpecSteps,
  DefendantSolicitor1SpecSteps,
  ClaimantSolicitorApiSteps,
  CaseRoleAssignmentApiSteps,
}) => {
  await ClaimantSolicitorSpecSteps.Login();
  await ClaimantSolicitorSpecSteps.CreateClaimSmallTrack2v1();
  await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
  await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
  await DefendantSolicitor1SpecSteps.Login();
  await DefendantSolicitor1SpecSteps.RespondSmallTrackFullDefence2v1();
  await ClaimantSolicitorSpecSteps.Login();
  await ClaimantSolicitorSpecSteps.RespondSmallClaimIntentToProceed2v1();
});
