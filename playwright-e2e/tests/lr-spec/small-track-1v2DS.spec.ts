import { test } from '../../playwright-fixtures';

test.only('1v2DS Specified Small track Defendant Full Defence Claimant Intent To Proceed - Claim Journey', async ({
  ClaimantSolicitorSpecSteps,
  DefendantSolicitor1SpecSteps,
  DefendantSolicitor2SpecSteps,
  ClaimantSolicitorSpecApiSteps,
  CaseRoleAssignmentApiSteps,
}) => {
  // await ClaimantSolicitorSpecSteps.Login();
  // await ClaimantSolicitorSpecSteps.CreateClaimSmallTrack1v2DS();
  // await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
  // await CaseRoleAssignmentApiSteps.AssignCaseRoleToDefendant1();
  // await CaseRoleAssignmentApiSteps.AssignCaseRoleToDefendant2();
  // await DefendantSolicitor1SpecSteps.Login();
  // await DefendantSolicitor1SpecSteps.RespondSmallTrackFullDefence1v2DSDefendantSolicitor1();
  await DefendantSolicitor2SpecSteps.Login();
  await DefendantSolicitor2SpecSteps.SmallTrackFullDefence1v2DSDefendantSolicitor2();
  await ClaimantSolicitorSpecSteps.Login();
  await ClaimantSolicitorSpecSteps.SmallClaimIntentToProceed1v2DS();
});
