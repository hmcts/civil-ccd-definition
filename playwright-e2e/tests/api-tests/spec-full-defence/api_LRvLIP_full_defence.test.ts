import { test } from '../../../playwright-fixtures/index';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  'LR v LIP spec full defence api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('LR v LIP spec full defence', async ({
      ClaimantSolicitorSpecApiSteps,
      DefendantCitizenApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({ claimType: ClaimType.ONE_VS_ONE_LIP });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
      await DefendantCitizenApiSteps.RespondSmallFullDefence();
      await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence();
    });
  },
);
