import { test } from '../../../playwright-fixtures/index';

test.describe('1v2SS default judgement api journey', { tag: '@civil-service-nightly' }, async () => {
  test('1v2SS default judgement api', async ({
                                             ClaimantSolicitorApiSteps,
                                             CaseRoleAssignmentApiSteps,
                                           }) => {
    await ClaimantSolicitorApiSteps.CreateClaimFastTrack1v2SS();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.NotifyClaim();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails();
    await ClaimantSolicitorApiSteps.AmendRespondent1ResponseDeadline();
    await ClaimantSolicitorApiSteps.RequestDefaultJudgement();
  });
});
