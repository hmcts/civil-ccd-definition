import { test } from '../../../playwright-fixtures/index';

test.describe('Unsuccessful mediation for spec small claim with unrepresented defendant', { tag: '@civil-service-nightly' }, async () => {
  test('Unsuccessful mediation for spec small claim with unrepresented defendant', async ({
    ClaimantSolicitorSpecApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmall1vLIP();
  });
});
