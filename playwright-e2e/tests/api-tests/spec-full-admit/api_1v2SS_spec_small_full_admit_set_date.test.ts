import { test } from '../../../playwright-fixtures/index';
import ClaimType from '../../../constants/cases/claim-type';
import ClaimTrack from '../../../constants/cases/claim-track';
import DefendantResponseSpecType from '../../../constants/ccd-events/ccd-events/defendant-response-spec/defendant-response-spec-type';
import PaymentTypeSpec from '../../../constants/ccd-events/ccd-events/defendant-response-spec/payment-type-spec';

test.describe(
  '1v2SS spec small full admit set date api journey',
  { tag: ['@civil-service-nightly', '@api-spec-full-admit'] },
  async () => {
    test('1v2SS spec small full admit set date', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({ claimType: ClaimType.ONE_VS_TWO_SAME_SOL });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.SMALL_CLAIM,
        claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
        responseType: DefendantResponseSpecType.FULL_ADMISSION,
        paymentType: PaymentTypeSpec.BY_SET_DATE,
      });
      // await ClaimantSolicitorSpecApiSteps.RespondFullAdmitSetDate();
    });
  },
);
