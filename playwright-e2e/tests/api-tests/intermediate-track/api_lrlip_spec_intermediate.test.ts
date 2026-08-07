import { test } from '../../../playwright-fixtures/index';

test.describe('1v1 LIP v LIP and LR v LIP spec api journeys', { tag: '@civil-service-nightly' }, async () => {
  test('1v1 LR v LiP intermediate track', async ({
    ClaimantSolicitorSpecApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimIntermediate1vLIP();
  });
});
