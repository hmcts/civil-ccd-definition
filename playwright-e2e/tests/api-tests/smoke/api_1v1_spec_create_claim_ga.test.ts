import config from '../../../config/config';
import { test } from '../../../playwright-fixtures';

test.describe('Smoke test - 1v1 spec create claim and create general application', { tag: '@civil-service-smoke' }, () => {
  test('1v1 spec create claim', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    ClaimantSolicitorGaApiSteps
  }) => {
    test.fail(config.zodValidationEnabled);
    if(process.env.RUN_FAILING_SMOKE_TESTS === 'true') {
      throw new Error('This test is currently failing and is being skipped. Please check the test and fix it before enabling it again.');
    }
    await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorSpecApiSteps.InitiateGA();
    await ClaimantSolicitorGaApiSteps.MakePaymentForClaimIssued();
  });
});
