import { test } from '../../../playwright-fixtures/index';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  'Unsuccessful mediation for spec small claim with unrepresented defendant',
  { tag: '@civil-service-nightly' },
  async () => {
    test('Unsuccessful mediation for spec small claim with unrepresented defendant', async ({
      ClaimantSolicitorSpecApiSteps,
      DefendantCitizenApiSteps,
      CaseRoleAssignmentApiSteps,
      CaseworkerApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({ claimType: ClaimType.ONE_VS_ONE_LIP });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
      await DefendantCitizenApiSteps.RespondSmallFullDefence();
      await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence();
      await CaseworkerApiSteps.MediationUnsuccessful();
    });
  },
);
