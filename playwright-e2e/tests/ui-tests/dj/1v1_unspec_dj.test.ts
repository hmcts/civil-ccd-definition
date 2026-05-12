import { test } from '../../../playwright-fixtures/index';

test.describe('1v1 unspec default judgment', { tag: '@civil-ccd-nightly' }, () => {
  test('1v1 unspec default judgment', async ({
    ClaimantSolicitorSteps,
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaimSmallTrack1v1();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorSteps.Login();
    await ClaimantSolicitorSteps.NotifyClaim();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorSteps.NotifyClaimDetails();
    await ClaimantSolicitorApiSteps.AmendRespondent1ResponseDeadline();
    await ClaimantSolicitorSteps.RequestDefaultJudgment();
  });
})