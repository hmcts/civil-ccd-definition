import { test } from '../../../playwright-fixtures/index';

test.describe(
  '2v1 spec default judgement api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    // DTSCCI-5198: 2v1 is non-divergent in DefaultJudgementSpecHandler.
    test.skip('2v1 spec default judgement api', async ({
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
