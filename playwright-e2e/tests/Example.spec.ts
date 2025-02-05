import { test } from '../playwright-fixtures/index';

test('Unspec Test 1v1 Example', async ({
  CreateClaimSteps,
  ApiServiceRequestsSteps,
  NotifyClaimSteps,
  NotifyClaimDetailsSteps,
  ApiCaseRoleAssignmentSteps,
  IdamSteps,
  DefendantResponseSteps,
  ClaimantResponseSteps,
}) => {
  await IdamSteps.ClaimantSolicitorLogin();
  await CreateClaimSteps.SmallTrack1v1();
  await ApiServiceRequestsSteps.MakePaymentForClaimIssue();
  await NotifyClaimSteps.NotifyClaim1v1();
  await ApiCaseRoleAssignmentSteps.AssignDefendantCaseRoles1v1();
  await NotifyClaimDetailsSteps.NotifyClaimDetails1v1();
  await IdamSteps.DefendantSolicitor1Login();
  await DefendantResponseSteps.SmallTrackFullDefence1v1();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSteps.SmallClaimIntentToProceed1v1();
});

test('Api Unspec Test Example', async ({
  ApiCreateClaimSteps,
  ApiServiceRequestsSteps,
  IdamSteps,
  NotifyClaimSteps,
  ApiCaseRoleAssignmentSteps,
  NotifyClaimDetailsSteps,
}) => {
  await ApiCreateClaimSteps.SmallTrack1v1();
  await ApiServiceRequestsSteps.MakePaymentForClaimIssue();
  await IdamSteps.ClaimantSolicitorLogin();
  await NotifyClaimSteps.NotifyClaim1v1();
  await ApiCaseRoleAssignmentSteps.AssignDefendantCaseRoles1v1();
  await NotifyClaimDetailsSteps.NotifyClaimDetails1v1();
  await IdamSteps.DefendantSolicitor1Login();
});
