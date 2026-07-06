import { test } from '../../../playwright-fixtures/index';

test.describe('1v2DS spec intermediate track api journey', {
  tag: '@civil-service-nightly',
}, async () => {
  test('1v2DS spec full defence intermediate claim', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimIntermediate1v2DS();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
  });
});
