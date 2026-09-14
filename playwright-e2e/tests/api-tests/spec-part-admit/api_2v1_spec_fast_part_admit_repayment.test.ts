import { test } from '../../../playwright-fixtures/index';
import ClaimType from '../../../constants/cases/claim-type';
import DefendantResponseSpecType from '../../../constants/ccd-events/ccd-events/defendant-response-spec/defendant-response-spec-type';
import PaymentTypeSpec from '../../../constants/ccd-events/ccd-events/defendant-response-spec/payment-type-spec';

test.describe(
  '2v1 spec fast part admit api journey',
  { tag: ['@civil-service-nightly', '@api-spec-part-admit'] },
  async () => {
    test('2v1 spec fast part admit setup before defendant response', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimFast2v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimType: ClaimType.TWO_VS_ONE,
        responseType: DefendantResponseSpecType.PART_ADMISSION,
        paymentType: PaymentTypeSpec.REPAYMENT_PLAN,
      });
      // await ClaimantSolicitorSpecApiSteps.RespondFastRejectPartAdmit();
    });
  },
);
