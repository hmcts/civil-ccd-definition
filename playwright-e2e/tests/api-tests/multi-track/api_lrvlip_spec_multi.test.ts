import { test } from '../../../playwright-fixtures/index';

test.describe('1v1 LR v LiP multi track api journey', { tag: '@civil-service-nightly' }, async () => {
  test('1v1 LR v LiP multi track', async ({
    ClaimantSolicitorSpecApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimMulti1vLIP();
  });
});
