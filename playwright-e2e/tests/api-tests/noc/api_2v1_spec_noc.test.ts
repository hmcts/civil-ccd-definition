import { test } from '../../../playwright-fixtures/index';

test.describe('2v1 spec notice of change api journey', { tag: '@civil-service-nightly' }, async () => {
  test('2v1 spec notice of change', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    OtherClaimantSolicitor1ApiSteps,
    OtherDefendantSolicitor1ApiSteps
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFast2v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await OtherClaimantSolicitor1ApiSteps.NoticeOfChangeC1();
    await OtherDefendantSolicitor1ApiSteps.NoticeOfChangeD1();
  });
});
