import { test } from '../../../playwright-fixtures/index';

test.describe('1v1 unspec notice of change api journey',  async () => {
  test('1v1 unspec notice of change', async ({
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
    OtherClaimantSolicitor1ApiSteps,
    OtherDefendantSolicitor1ApiSteps,
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaimFast1v1();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.NotifyClaim();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails();
    await OtherClaimantSolicitor1ApiSteps.NoticeOfChangeC1();
    await OtherDefendantSolicitor1ApiSteps.NoticeOfChangeD1();
  });
});
