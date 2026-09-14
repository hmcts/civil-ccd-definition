import { test } from '../../../playwright-fixtures/index';
import ClaimType from '../../../constants/cases/claim-type';
import DefendantResponseSpecType from '../../../constants/ccd-events/ccd-events/defendant-response-spec/defendant-response-spec-type';

test.describe(
  '2v1 spec small full admit repayment api journey',
  { tag: ['@civil-service-nightly', '@api-spec-full-admit'] },
  async () => {
    test('2v1 spec small full admit repayment', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmall2v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimType: ClaimType.TWO_VS_ONE,
        responseType: DefendantResponseSpecType.FULL_ADMISSION,
      });
      // await ClaimantSolicitorSpecApiSteps.RespondFullAdmitRepayment();
    });
  },
);
