import { test } from '../../../playwright-fixtures/index';

test.describe('2v1 unspec notice of change api journey', { tag: '@civil-service-nightly' }, async () => {
  test('2v1 unspec notice of change', async ({
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
    OtherClaimantSolicitor1ApiSteps
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaimFast2v1();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.NotifyClaim();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails();
    await OtherClaimantSolicitor1ApiSteps.NoticeOfChangeC1();
  });
});
