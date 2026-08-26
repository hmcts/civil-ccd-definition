import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v2 spec record judgment api test',
  { tag: '@civil-service-nightly' },
  async () => {
    // DTSCCI-5198: same SET_ASIDE_JUDGMENT handler as the 1v1 JO smoke path.
    test.skip('Default judgment Spec claim 1v2 - Set Aside After Order  - Record new judgment', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      CaseworkerApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v2SS();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorSpecApiSteps.AmendRespondent1ResponseDeadline();
      await ClaimantSolicitorSpecApiSteps.DefaultJudgementSpec1v2();
      await CaseworkerApiSteps.SetAsideJudgmentOrder();
    });

    // DTSCCI-5198: paid in full + set aside after defence are in civil-service integration tests.
    test.skip('Default judgment Spec claim 1v2 - Set Aside after defence - Case taken offline', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      CaseworkerApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v2DS();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorSpecApiSteps.AmendRespondent1ResponseDeadline();
      await ClaimantSolicitorSpecApiSteps.AmendRespondent2ResponseDeadline();
      await ClaimantSolicitorSpecApiSteps.DefaultJudgementSpec1v2();
      await ClaimantSolicitorSpecApiSteps.JudgmentPaidInFull();
      await CaseworkerApiSteps.SetAsideJudgmentOrder();
    });

    // DTSCCI-5198: record / edit covered by RecordJudgmentWorkflowTest and EditJudgmentWorkflowTest.
    test.skip('Record Judgment with mark judgment paid Spec claim 1v2', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      JudgeApiSteps,
      CaseworkerApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v2SS();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.RespondFastFullDefence1v2SS();
      await ClaimantSolicitorSpecApiSteps.RespondFastRejectFullDefence1v2SS();
      await JudgeApiSteps.SdoTrail();
      await JudgeApiSteps.GenerateDirectionsOrderFreeFormOrder();
      await CaseworkerApiSteps.ConfirmOrderReview();
      await CaseworkerApiSteps.RecordJudgmentDeterMeansImmediately();
      await CaseworkerApiSteps.EditJudgmentDeterMeansSetDate();
    });
  },
);
