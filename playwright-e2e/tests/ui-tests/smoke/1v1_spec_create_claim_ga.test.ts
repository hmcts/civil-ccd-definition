import { test } from '../../../playwright-fixtures';

test.describe('Smoke test - API 1v1 spec create claim and create general application', () => {
  test('1v1 spec create claim and create general application', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    ClaimantSolicitorGaApiSteps,
    ClaimantSolicitorGaSteps
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorSpecApiSteps.InitiateGA();
    await ClaimantSolicitorGaApiSteps.MakePaymentForClaimIssued();
    await ClaimantSolicitorGaSteps.Login();
    await ClaimantSolicitorGaSteps.NavigateToGaCaseDetails();
  });
});