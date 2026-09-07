import { test } from '../../../playwright-fixtures/index';

test.describe('2v1 discontinue claim spec api journey', { tag: '@civil-service-nightly' }, async () => {
  test('2v1 discontinue claim spec', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    CaseworkerApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFast2v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorSpecApiSteps.DiscontinueClaimFull2v1();
    await CaseworkerApiSteps.ValidateDiscontinueClaimYes();
  });
});
