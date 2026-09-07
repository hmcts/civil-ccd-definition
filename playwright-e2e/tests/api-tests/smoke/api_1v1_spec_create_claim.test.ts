import { test } from '../../../playwright-fixtures';

test.describe('Smoke test - API 1v1 spec create claim', { tag: '@pw-api-smoke' }, () => {
  test('1v1 spec create claim', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
  });
});