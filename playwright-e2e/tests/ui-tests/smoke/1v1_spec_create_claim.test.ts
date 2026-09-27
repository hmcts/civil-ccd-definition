import { test } from '../../../playwright-fixtures';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe('Smoke test - 1v1 spec create claim', { tag: '@civil-ccd-smoke' }, () => {
  test('1v1 spec create claim and check access', async ({
    ClaimantSolicitorSpecApiSteps,
    ClaimantSolicitorSpecSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaim({ claimTrack: ClaimTrack.FAST_CLAIM });
    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.NavigateToCaseDetails();
  });
});
