import { test } from '../../../playwright-fixtures/index';
import DefendantResponseSpecType from '../../../constants/ccd-events/ccd-events/defendant-response-spec/defendant-response-spec-type';
import PaymentTypeSpec from '../../../constants/ccd-events/ccd-events/defendant-response-spec/payment-type-spec';

test.describe(
  'Spec 1v1 judgment by admission mark paid in full api test',
  { tag: ['@civil-service-nightly', '@civil-service-master', '@civil-service-pr'] },
  async () => {
    test('1v1 LR v LR defendant response with full admit pay by set date judgment by admission mark paid in full', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        responseType: DefendantResponseSpecType.FULL_ADMISSION,
        paymentType: PaymentTypeSpec.BY_SET_DATE,
      });
      await ClaimantSolicitorSpecApiSteps.RespondAcceptFullAdmitRepayment();
      await ClaimantSolicitorSpecApiSteps.JudgmentPaidInFull();
    });
  },
);
