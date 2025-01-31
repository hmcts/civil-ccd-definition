import { test } from '../playwright-fixtures/index';

test(
  'Unspec Test 1v1 Example',
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
    // await IdamSteps.ClaimantSolicitorLogin();
    // await CreateClaimSteps.SmallTrack1v2DS();
    // await ApiServiceRequestsSteps.MakePaymentForClaimIssue();
    // await NotifyClaimSteps.NotifyClaim1v2DS();
    // await ApiCaseRoleAssignmentSteps.AssignDefendantCaseRoles1v2DS();
    // await NotifyClaimDetailsSteps.NotifyClaimDetails1v2DS();
    await IdamSteps.DefendantSolicitor1Login();
    await DefendantResponseSteps.RespondToDefence1v2DSDefendant1();
    await IdamSteps.DefendantSolicitor2Login();
    await DefendantResponseSteps.RespondToDefence1v2DSDefendant2();
    await IdamSteps.ClaimantSolicitorLogin();
    await ClaimantResponseSteps.SmallClaim1v2DS();
  },
);

test(
  'Unspec Test 1v2DS Example',
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
    // await IdamSteps.ClaimantSolicitorLogin();
    // await CreateClaimSteps.SmallTrack1v1();
    // await ApiServiceRequestsSteps.MakePaymentForClaimIssue();
    // await NotifyClaimSteps.NotifyClaim1v1();
    // await ApiCaseRoleAssignmentSteps.AssignDefendantCaseRoles1v2DS();
    // await NotifyClaimDetailsSteps.NotifyClaimDetails1v1();
    await IdamSteps.DefendantSolicitor1Login();
    await DefendantResponseSteps.RespondToDefence1v1();
    await IdamSteps.ClaimantSolicitorLogin();
    await ClaimantResponseSteps.SmallClaim1v1();
  },
);

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

test('Unspec with Defendant Response 1V2 Different Solicitor', async ({
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
  await NotifyClaimDetailsSteps.NotifyClaimDetails1v2DS();
  await IdamSteps.DefendantSolicitor1Login();
  await DefendantResponseSteps.RespondToDefence1v2DSDefendant1();
  await IdamSteps.DefendantSolicitor2Login();
  await DefendantResponseSteps.RespondToDefence1v2DSDefendant2();
});

test('Unspec with Defendant Response 1V2 Same Solicitor', async ({
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
  await NotifyClaimSteps.NotifyClaim1v2SS();
  await ApiCaseRoleAssignmentSteps.AssignDefendantCaseRoles1v2SS();
  await NotifyClaimDetailsSteps.NotifyClaimDetails1v2SS();
  await IdamSteps.DefendantSolicitor1Login();
  await DefendantResponseSteps.RespondToDefence1v2DSDefendant1();
});

test('Unspec with Defendant Response 2V1', async ({
  ApiCreateClaimSteps,
  ApiServiceRequestsSteps,
  IdamSteps,
  NotifyClaimSteps,
  ApiCaseRoleAssignmentSteps,
  NotifyClaimDetailsSteps,
  DefendantResponseSteps,
}) => {
  await ApiCreateClaimSteps.Create2v1Claim();
  await ApiServiceRequestsSteps.MakePaymentForClaimIssue();
  await IdamSteps.ClaimantSolicitorLogin();
  await NotifyClaimSteps.NotifyClaim1v1();
  await ApiCaseRoleAssignmentSteps.AssignDefendantCaseRoles1v1();
  await NotifyClaimDetailsSteps.NotifyClaimDetails1v1();
  await IdamSteps.DefendantSolicitor1Login();
});
