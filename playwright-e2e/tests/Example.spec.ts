import { test } from '../playwright-fixtures/index';

test('Test 1v1 example', async ({
  ClaimantSolicitorSteps,
  DefendantSolicitor1Steps,
  ClaimantSolicitorApiSteps,
  CaseRoleAssignmentApiSteps,
}) => {
  await ClaimantSolicitorSteps.Login();
  await ClaimantSolicitorSteps.CreateClaimSmallTrack1v1();
  await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
  await ClaimantSolicitorSteps.NotifyClaim1v1();
  await CaseRoleAssignmentApiSteps.AssignCaseRoleToDefendant1();
  await ClaimantSolicitorSteps.NotifyClaimDetails1v1();
  await DefendantSolicitor1Steps.Login();
  await DefendantSolicitor1Steps.RespondSmallTrackFullDefence1v1();
  await ClaimantSolicitorSteps.Login();
  await ClaimantSolicitorSteps.RespondSmallClaimIntentToProceed1v1();
});

test('Api spec test example', async ({
  ClaimantSolicitorSpecApiSteps,
  IdamSteps,
  CaseRoleAssignmentApiSteps,
  ExuiDashboardSteps,
}) => {
  await ClaimantSolicitorSpecApiSteps.CreateClaimSmallTrack1v1();
  await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
  await CaseRoleAssignmentApiSteps.AssignCaseRoleToDefendant1();
  await IdamSteps.DefendantSolicitor1Login();
  await ExuiDashboardSteps.GoToCaseDetails();
});
