import { test } from '../../../playwright-fixtures';

test.describe('Smoke test - 1v1 spec create claim and create general application', () => {
  test('1v1 spec create claim', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    ClaimantSolicitorGaApiSteps
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorSpecApiSteps.InitiateGA();
    await ClaimantSolicitorGaApiSteps.MakePaymentForClaimIssued();
  });
});
