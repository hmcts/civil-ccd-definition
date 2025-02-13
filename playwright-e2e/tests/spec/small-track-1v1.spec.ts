import { test } from '../../playwright-fixtures/index';

test('Test 1v1 spec example', async ({
  ClaimantSolicitorSpecSteps,
  DefendantSolicitor1SpecSteps,
  ClaimantSolicitorApiSteps,
  CaseRoleAssignmentApiSteps,
}) => {
  await ClaimantSolicitorSpecSteps.Login();
  await ClaimantSolicitorSpecSteps.CreateClaimSmallTrack1v1();
  await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
  await CaseRoleAssignmentApiSteps.AssignCaseRoleToDefendant1();
  await DefendantSolicitor1SpecSteps.Login();
  await DefendantSolicitor1SpecSteps.RespondSmallTrackFullDefence1v1();
  await ClaimantSolicitorSpecSteps.Login();
  await ClaimantSolicitorSpecSteps.RespondSmallClaimIntentToProceed1v1();
});
