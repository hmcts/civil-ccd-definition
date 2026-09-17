import { test } from '../../../playwright-fixtures/index';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v2SS spec small full admit set date api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v2SS spec small full admit set date', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({ claimType: ClaimType.ONE_VS_TWO_SAME_SOL });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.RespondFullAdmitSetDate1v2SS();
      // await ClaimantSolicitorSpecApiSteps.RespondFullAdmitSetDate();
    });
  },
);
