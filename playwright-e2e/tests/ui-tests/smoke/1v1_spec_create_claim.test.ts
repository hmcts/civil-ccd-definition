import { test } from '../../../playwright-fixtures';

test.describe('Smoke test - 1v1 spec create claim', { tag: '@civil-ccd-master-pr-smoke' }, () => {
  test('1v1 spec create claim and check access', async ({
    ClaimantSolicitorSpecApiSteps,
    ClaimantSolicitorSpecSteps
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v1();
    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.NavigateToCaseDetails();
  });
});