import { test } from '../../../playwright-fixtures/index';

test.describe('2v1 spec small part admit api journey',  async () => {
  test('2v1 spec small part admit setup before defendant response', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmall2v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecApiSteps.RespondSmallPartAdmitRepayment2v1();
    // await ClaimantSolicitorSpecApiSteps.RespondSmallRejectPartAdmit();
  });
});
