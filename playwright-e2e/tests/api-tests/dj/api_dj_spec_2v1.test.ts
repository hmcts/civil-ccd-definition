import { test } from '../../../playwright-fixtures/index';

test.describe(
  '2v1 spec default judgement api journey',
  
  async () => {
    test('2v1 spec default judgement api', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimFast2v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorSpecApiSteps.AmendRespondent1ResponseDeadline();
      await ClaimantSolicitorSpecApiSteps.DefaultJudgementSpec();
    });
  },
);
