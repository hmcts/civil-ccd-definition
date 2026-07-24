import { test } from '../../../playwright-fixtures/index';

test.describe('1v1 discontinue claim spec api journey', { tag: '@civil-service-nightly' }, async () => {
  test('1v1 discontinue claim spec', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    CaseworkerApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorSpecApiSteps.DiscontinueClaimFull();
    await CaseworkerApiSteps.ValidateDiscontinueClaimYes();
  });
});
