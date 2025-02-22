import { test } from '../../playwright-fixtures/index';

test('1v1 Specified Fast track Defendant Full Defence Claimant Intent To Proceed - Claim Journey', async ({
  ClaimantSolicitorSpecSteps,
  DefendantSolicitor1SpecSteps,
  ClaimantSolicitorSpecApiSteps,
  CaseRoleAssignmentApiSteps,
}) => {
  await ClaimantSolicitorSpecSteps.Login();
  await ClaimantSolicitorSpecSteps.CreateClaimFastTrack1v1();
  await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
  await CaseRoleAssignmentApiSteps.AssignCaseRoleToDefendant1();
  await DefendantSolicitor1SpecSteps.Login();
  await DefendantSolicitor1SpecSteps.RespondFastTrackFullDefence1v1();
  await ClaimantSolicitorSpecSteps.Login();
  await ClaimantSolicitorSpecSteps.RespondFastTrackIntentToProceed1v1();
});
