import { test } from '../../../playwright-fixtures/index';

test.describe('1v2SS unspec notice of change api journey', { tag: '@civil-service-nightly' }, async () => {
  test('notice of change - 1v2 - same solicitor to diff solicitor', async ({
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor2ApiSteps
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaimFast1v2SS();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.NotifyClaim();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails();
    await DefendantSolicitor2ApiSteps.NoticeOfChange(); 
  });
});
