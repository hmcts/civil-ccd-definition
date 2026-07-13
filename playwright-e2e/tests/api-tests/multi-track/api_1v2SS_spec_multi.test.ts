import { test } from '../../../playwright-fixtures/index';

test.describe('1v2SS spec api multi track journey', { tag: '@civil-service-nightly' }, async () => {
  test('1v2SS spec full defence multi claim', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimMulti1v2SS();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
  });
});
