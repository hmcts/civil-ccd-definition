import { test } from '../../../playwright-fixtures';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe('Smoke test - API 1v1 spec create claim', () => {
  test('1v1 spec create claim', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaim({ claimTrack: ClaimTrack.FAST_CLAIM });
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
  });
});
