import { test } from '../../../playwright-fixtures/index';

test.describe('LR v LIP spec stay case api journey', { tag: '@civil-service-nightly' }, async () => {
  test('LR v LIP spec stay case', async ({
    ClaimantSolicitorSpecApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmall1vLIP();
  });
});
