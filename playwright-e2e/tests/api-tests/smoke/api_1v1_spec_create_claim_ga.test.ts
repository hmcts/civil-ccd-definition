import config from '../../../config/config';
import { test } from '../../../playwright-fixtures';

test.describe('Smoke test - 1v1 spec create claim and create general application', { tag: '@civil-service-smoke' }, () => {
  test('1v1 spec create claim', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    ClaimantSolicitorGaApiSteps
  }) => {
    test.fail(config.zodValidationEnabled);
    await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorSpecApiSteps.InitiateGA();
    await ClaimantSolicitorGaApiSteps.MakePaymentForClaimIssued();
  });
});
