import { test } from '../../../playwright-fixtures/index';

test.describe('1vLIP spec multi track journey',  () => {
  test('1vLIP spec multi track', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantCitizenApiSteps,
    ClaimantSolicitorSpecSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimMulti1vLIP();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
    await DefendantCitizenApiSteps.RespondMultiFullDefence();
    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.RespondMultiProceed1vLIP();
  });
});
