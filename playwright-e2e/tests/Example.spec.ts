import { test } from '../playwright-fixtures/index';

test('Api Spec Test Example', async ({
  ApiCreateClaimSpecSteps,
  ApiServiceRequestsSteps,
  ApiCaseRoleAssignmentSteps,
  IdamSteps,
  ExuiDashboardSteps,
}) => {
  await ApiCreateClaimSpecSteps.Create1v1Claim();
  await ApiServiceRequestsSteps.MakePaymentForClaimIssue();
  await ApiCaseRoleAssignmentSteps.AssignDefendantCaseRoles1v1();
  await IdamSteps.ClaimantSolicitorLogin();
  await ExuiDashboardSteps.GoToCaseDetails();
  await IdamSteps.DefendantSolicitor1Login();
  await ExuiDashboardSteps.GoToCaseDetails();
});

test('Api Unspec Test Example', async ({
  ApiCreateClaimSteps,
  ApiServiceRequestsSteps,
  IdamSteps,
  NotifyClaimSteps,
  ApiCaseRoleAssignmentSteps,
  NotifyClaimDetailsSteps,
}) => {
  await ApiCreateClaimSteps.Create1v1Claim();
  await ApiServiceRequestsSteps.MakePaymentForClaimIssue();
  await IdamSteps.ClaimantSolicitorLogin();
  await NotifyClaimSteps.NotifyClaim1v1();
  await ApiCaseRoleAssignmentSteps.AssignDefendantCaseRoles1v1();
  await NotifyClaimDetailsSteps.NotifyClaimDetails1v1();
  await IdamSteps.DefendantSolicitor1Login();
});

test('Unspec with Defendant Response 1v1', async ({
  ApiCreateClaimSteps,
  ApiServiceRequestsSteps,
  IdamSteps,
  NotifyClaimSteps,
  ApiCaseRoleAssignmentSteps,
  NotifyClaimDetailsSteps,
  DefendantResponseSteps,
}) => {
  await ApiCreateClaimSteps.Create1v1Claim();
  await ApiServiceRequestsSteps.MakePaymentForClaimIssue();
  await IdamSteps.ClaimantSolicitorLogin();
  await NotifyClaimSteps.NotifyClaim1v1();
  await ApiCaseRoleAssignmentSteps.AssignDefendantCaseRoles1v1();
  await NotifyClaimDetailsSteps.NotifyClaimDetails1v1();
  await IdamSteps.DefendantSolicitor1Login();
  await DefendantResponseSteps.RespondToDefence1v1();
});

test(
  'Unspec with Defendant Response 1V2 Different Solicitor',
  { tag: ['@debug'] },
  async ({
    ApiCreateClaimSteps,
    ApiServiceRequestsSteps,
    IdamSteps,
    NotifyClaimSteps,
    ApiCaseRoleAssignmentSteps,
    NotifyClaimDetailsSteps,
    DefendantResponseSteps,
  }) => {
    await ApiCreateClaimSteps.Create1v2Claim();
    await ApiServiceRequestsSteps.MakePaymentForClaimIssue();
    await IdamSteps.ClaimantSolicitorLogin();
    await NotifyClaimSteps.NotifyClaim1v2DS();
    await ApiCaseRoleAssignmentSteps.AssignDefendantCaseRoles1v2DS();
    await NotifyClaimDetailsSteps.NotifyClaimDetails1v2();
    await IdamSteps.DefendantSolicitor1Login();
    await DefendantResponseSteps.RespondToDefence1v2DSDefendant1();
    await IdamSteps.DefendantSolicitor2Login();
    await DefendantResponseSteps.RespondToDefence1v2DSDefendant2();
  },
);
