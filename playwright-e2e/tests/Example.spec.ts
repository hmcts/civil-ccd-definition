import { test } from '../playwright-fixtures/index';

test('Test 1v1 example', async ({
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
  // await ApiServiceRequestsSteps.MakePaymentForClaimIssue();
  // await NotifyClaimSteps.NotifyClaim1v1();
  // await ApiCaseRoleAssignmentSteps.AssignRoleToDefendant1();
  // await NotifyClaimDetailsSteps.NotifyClaimDetails1v1();
  // await IdamSteps.DefendantSolicitor1Login();
  // await DefendantResponseSteps.SmallTrackFullDefence1v1();
  // await IdamSteps.ClaimantSolicitorLogin();
  // await ClaimantResponseSteps.SmallClaimIntentToProceed1v1();
});

test(
  'Api spec test example',
  { tag: '@debug' },
  async ({
    CreateClaimSpecSteps,
    ApiServiceRequestsSteps,
    IdamSteps,
    ApiCaseRoleAssignmentSteps,
    ExuiDashboardSteps,
  }) => {
    await IdamSteps.ClaimantSolicitorLogin();
    await CreateClaimSpecSteps.SmallTrack1v2DS();
    // await ApiServiceRequestsSteps.MakePaymentForClaimIssue();
    // await ApiCaseRoleAssignmentSteps.AssignRoleToDefendant1();
    // await IdamSteps.DefendantSolicitor1Login();
    // await ExuiDashboardSteps.GoToCaseDetails();
  },
);
