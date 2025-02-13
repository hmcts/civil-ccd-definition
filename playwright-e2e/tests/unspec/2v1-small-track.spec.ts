import { test } from '../../playwright-fixtures/index';

test('Test 2v1 small track unspec', async ({
  ClaimantSolicitorSteps,
  DefendantSolicitor1Steps,
  ClaimantSolicitorApiSteps,
  CaseRoleAssignmentApiSteps,
}) => {
  await ClaimantSolicitorSteps.Login();
  await ClaimantSolicitorSteps.CreateClaimSmallTrack2v1();
  await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
  await ClaimantSolicitorSteps.NotifyClaim2v1();
  await CaseRoleAssignmentApiSteps.AssignCaseRoleToDefendant1();
  await ClaimantSolicitorSteps.NotifyClaimDetails2v1();
  await DefendantSolicitor1Steps.Login();
  await DefendantSolicitor1Steps.RespondSmallTrackFullDefence2v1();
  await ClaimantSolicitorSteps.Login();
  await ClaimantSolicitorSteps.RespondSmallClaimIntentToProceed2v1();
});
