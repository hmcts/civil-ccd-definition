import { test } from '../../../playwright-fixtures/index';

test.describe('1v2DS spec api multi track journey', { tag: '@civil-service-nightly' }, async () => {
  test('1v2DS spec full defence multi claim', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimMulti1v2DS();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
  });
});
