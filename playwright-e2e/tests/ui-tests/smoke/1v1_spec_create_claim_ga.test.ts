import { test } from '../../../playwright-fixtures';
import ClaimTrack from '../../../constants/cases/claim-track';

import config from '../../../config/config';

test.describe(
  'Smoke test - API 1v1 spec create claim and create general application',
  { tag: '@civil-ccd-smoke' },
  () => {
    test('1v1 spec create claim and create general application', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      ClaimantSolicitorGaApiSteps,
      ClaimantSolicitorGaSteps,
    }) => {
      test.fail(config.zodValidationEnabled);
      await ClaimantSolicitorSpecApiSteps.CreateClaim({ claimTrack: ClaimTrack.FAST_CLAIM });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorSpecApiSteps.InitiateGA();
      await ClaimantSolicitorGaApiSteps.MakePaymentForClaimIssued();
      await ClaimantSolicitorGaSteps.Login();
      await ClaimantSolicitorGaSteps.NavigateToGaCaseDetails();
    });
  },
);
