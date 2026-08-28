import { test } from '../../../playwright-fixtures/index';

test.describe('1v2DS unspec notice of change api journey',  async () => {
  test('1vDS spec notice of change', async ({
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
    OtherDefendantSolicitor1ApiSteps,
    OtherDefendantSolicitor2ApiSteps,
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaimFast1v2DS();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.NotifyClaim();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails();
    await OtherDefendantSolicitor1ApiSteps.NoticeOfChangeD1();
    await OtherDefendantSolicitor2ApiSteps.NoticeOfChangeD2();
  });
});
