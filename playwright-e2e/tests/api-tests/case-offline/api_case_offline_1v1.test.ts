import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe('1v1 fast case offline api journey', { tag: '@civil-service-nightly' }, async () => {
  test('1v1 case offline', async ({ ClaimantSolicitorApiSteps, CaseworkerApiSteps }) => {
    await ClaimantSolicitorApiSteps.CreateClaim({ claimTrack: ClaimTrack.FAST_CLAIM });
    await CaseworkerApiSteps.CaseProceedsInCaseman();
  });
});
