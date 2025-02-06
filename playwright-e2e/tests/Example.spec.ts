import { test } from '../playwright-fixtures/index';

test(
  'Test 1v1 example',
  { tag: '@debug' },
  async ({
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
    await ApiCaseRoleAssignmentSteps.AssignRoleToDefendant1();
    await NotifyClaimDetailsSteps.NotifyClaimDetails1v1();
    await IdamSteps.DefendantSolicitor1Login();
    await DefendantResponseSteps.SmallTrackFullDefence1v1();
    await IdamSteps.ClaimantSolicitorLogin();
    await ClaimantResponseSteps.SmallClaimIntentToProceed1v1();
  },
);

test('Api spec test example', async ({
  ApiCreateClaimSpecSteps,
  ApiServiceRequestsSteps,
  IdamSteps,
  NotifyClaimSteps,
  ApiCaseRoleAssignmentSteps,
  NotifyClaimDetailsSteps,
}) => {
  await ApiCreateClaimSpecSteps.SmallTrack1v1();
  await ApiServiceRequestsSteps.MakePaymentForClaimIssue();
  await IdamSteps.ClaimantSolicitorLogin();
  await NotifyClaimSteps.NotifyClaim1v1();
  await ApiCaseRoleAssignmentSteps.AssignRoleToDefendant1();
  await NotifyClaimDetailsSteps.NotifyClaimDetails1v1();
  await IdamSteps.DefendantSolicitor1Login();
});
