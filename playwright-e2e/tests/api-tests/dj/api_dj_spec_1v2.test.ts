import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v2 spec default judgement api journey',
  
  async () => {
    // DTSCCI-5198: DEFAULT_JUDGEMENT_SPEC 1v2 is service-owned. Spec 1v1 remains the API smoke path.
    test.skip('Default Judgment Spec claim 1v2 non divergent', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v2SS();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorSpecApiSteps.AmendRespondent1ResponseDeadline();
      await ClaimantSolicitorSpecApiSteps.DefaultJudgementSpec1v2();
    });

    // DTSCCI-5198: divergent heritage transition covered in DefaultJudgementSpecWorkflowTest.
    test.skip('Default Judgment Spec claim 1v2 divergent', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v2SS();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorSpecApiSteps.AmendRespondent1ResponseDeadline();
      await ClaimantSolicitorSpecApiSteps.DefaultJudgementSpec();
    });
  },
);
