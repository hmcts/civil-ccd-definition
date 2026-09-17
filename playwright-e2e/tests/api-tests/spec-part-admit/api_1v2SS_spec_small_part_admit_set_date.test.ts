import { test } from '../../../playwright-fixtures/index';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v2SS spec small part admit api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v2SS spec small part admit setup before defendant response', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({ claimType: ClaimType.ONE_VS_TWO_SAME_SOL });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.RespondSmallPartAdmitSetDate1v2SS();
      // await ClaimantSolicitorSpecApiSteps.RespondSmallRejectPartAdmit();
    });
  },
);
