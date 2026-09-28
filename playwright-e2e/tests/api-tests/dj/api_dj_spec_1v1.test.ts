import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 spec default judgement api journey @debug',
  { tag: ['@civil-service-nightly-smoke', '@api-dj'] },
  async () => {
    test('1v1 spec default judgement api', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v1a();
      // await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      // await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      // await ClaimantSolicitorSpecApiSteps.AmendRespondent1ResponseDeadline();
      // await ClaimantSolicitorSpecApiSteps.DefaultJudgementSpec();
    });
  },
);
