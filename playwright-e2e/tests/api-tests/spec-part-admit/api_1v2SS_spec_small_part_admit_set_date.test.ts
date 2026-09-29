import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';
import DefendantResponseSpecType from '../../../constants/ccd-events/ccd-events/defendant-response-spec/defendant-response-spec-type';
import PaymentTypeSpec from '../../../constants/ccd-events/ccd-events/defendant-response-spec/payment-type-spec';

test.describe(
  '1v2SS spec small part admit api journey',
  { tag: ['@civil-service-nightly', '@api-spec-part-admit'] },
  async () => {
    test('1v2SS spec small part admit setup before defendant response', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmall1v2SS();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.SMALL_CLAIM,
        claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
        responseType: DefendantResponseSpecType.PART_ADMISSION,
        paymentType: PaymentTypeSpec.BY_SET_DATE,
      });
      // await ClaimantSolicitorSpecApiSteps.RespondSmallRejectPartAdmit();
    });
  },
);
