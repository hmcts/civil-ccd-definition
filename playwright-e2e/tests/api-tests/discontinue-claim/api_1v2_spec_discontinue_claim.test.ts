import { test } from '../../../playwright-fixtures/index';

test.describe('1v2 discontinue claim spec api journey', { tag: '@civil-service-nightly' }, async () => {
  test('1v2 discontinue claim spec', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    CaseworkerApiSteps
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v2DS();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
    await ClaimantSolicitorSpecApiSteps.DiscontinueClaimFull1v2();
    await CaseworkerApiSteps.ValidateDiscontinueClaimYes();
  });

  test('1v2 discontinue claim spec negative', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    CaseworkerApiSteps
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v2SS();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorSpecApiSteps.DiscontinueClaimFull1v2();
    await CaseworkerApiSteps.ValidateDiscontinueClaimNo();
  });
});
