import { test } from '../../../playwright-fixtures/index';

test.describe('LRvLIP spec request for reconsideration api journeys', { tag: '@civil-service-nightly' }, async () => {
  test('1v1 LR v LiP Request for reconsideration', async ({
    ClaimantSolicitorSpecApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmall1vLIP();
  });
});
