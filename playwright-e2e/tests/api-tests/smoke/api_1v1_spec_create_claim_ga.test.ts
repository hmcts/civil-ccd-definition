import config from '../../../config/config';
import { test } from '../../../playwright-fixtures';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe('Smoke test - 1v1 spec create claim and create general application', { tag: '@civil-service-smoke' }, () => {
  test('1v1 spec create claim', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    ClaimantSolicitorGaApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaim({ claimTrack: ClaimTrack.FAST_CLAIM });
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorSpecApiSteps.InitiateGA();
    await ClaimantSolicitorGaApiSteps.MakePaymentForClaimIssued();
  });
});
