import { test } from '../../../playwright-fixtures/index';

test.describe('1v2SS spec small full admit set date api journey',  async () => {
  test('1v2SS spec small full admit set date', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmall1v2SS();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecApiSteps.RespondFullAdmitSetDate1v2SS();
    // await ClaimantSolicitorSpecApiSteps.RespondFullAdmitSetDate();
  });
});
