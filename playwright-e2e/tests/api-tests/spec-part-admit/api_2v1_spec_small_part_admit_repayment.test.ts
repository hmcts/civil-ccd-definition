import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';
import DefendantResponseSpecType from '../../../constants/ccd-events/ccd-events/defendant-response-spec/defendant-response-spec-type';
import PaymentTypeSpec from '../../../constants/ccd-events/ccd-events/defendant-response-spec/payment-type-spec';

test.describe(
  '2v1 spec small part admit api journey',
  { tag: ['@civil-service-nightly', '@api-spec-part-admit'] },
  async () => {
    test('2v1 spec small part admit setup before defendant response', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmall2v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.SMALL_CLAIM,
        claimType: ClaimType.TWO_VS_ONE,
        responseType: DefendantResponseSpecType.PART_ADMISSION,
        paymentType: PaymentTypeSpec.REPAYMENT_PLAN,
      });
      // await ClaimantSolicitorSpecApiSteps.RespondSmallRejectPartAdmit();
    });
  },
);
