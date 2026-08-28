import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 spec default judgement api journey',
  
  async () => {
    // DTSCCI-5198 SMOKE (Playwright nightly): service logic is in DefaultJudgementSpecWorkflowTest.
    test('1v1 spec default judgement api', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorSpecApiSteps.AmendRespondent1ResponseDeadline();
      await ClaimantSolicitorSpecApiSteps.DefaultJudgementSpec();
    });
  },
);
