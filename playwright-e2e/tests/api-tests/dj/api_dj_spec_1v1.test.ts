import { test } from '../../../playwright-fixtures/index';

test.describe('1v1 spec default judgement api journey', { tag: '@civil-service-nightly' }, async () => {
  test('1v1 spec default judgement api', async ({
                                             ClaimantSolicitorApiSteps,
                                             ClaimantSolicitorSpecApiSteps,
                                             CaseRoleAssignmentApiSteps,
                                           }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFastTrack1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorSpecApiSteps.AmendRespondent1ResponseDeadline();
    await ClaimantSolicitorApiSteps.RequestDefaultJudgementSpec();
  });
});
