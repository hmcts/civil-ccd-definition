import { test } from '../../../playwright-fixtures/index';

test.describe('1v1 discontinue claim spec api journey', { tag: ['@civil-service-nightly', '@api-discontinue-claim'] }, async () => {
  test('1v1 discontinue claim spec', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    CaseworkerApiSteps,
  }) => {
    if(process.env.RUN_FAILING_FUNCTIONAL_TESTS === 'true') {
      throw new Error('This test is currently failing and is being skipped. Please check the test and fix it before enabling it again.');
    }
    await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorSpecApiSteps.DiscontinueClaimFull();
    await CaseworkerApiSteps.ValidateDiscontinueClaimYes();
  });
});
