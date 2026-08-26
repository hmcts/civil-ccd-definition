import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 spec record judgment api test',
  { tag: '@civil-service-nightly' },
  async () => {
    // DTSCCI-5198 SMOKE: keep one JO API chain. Handlers covered in civil-service integration tests.
    test('SetAside Default Judgment after judgment error - Spec claim 1v1 - Case taken offline', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      CaseworkerApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorSpecApiSteps.AmendRespondent1ResponseDeadline();
      await ClaimantSolicitorSpecApiSteps.DefaultJudgementSpec();
      await ClaimantSolicitorSpecApiSteps.JudgmentPaidInFull();
      await CaseworkerApiSteps.SetAsideJudgmentError();
    });

    // DTSCCI-5198: record / edit / paid-in-full are in civil-service integration tests.
    test.skip('Record Judgment Spec claim 1v1 with mark paid in full', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      JudgeApiSteps,
      CaseworkerApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.RespondFastFullDefence();
      await ClaimantSolicitorSpecApiSteps.RespondFastRejectFullDefence();
      await JudgeApiSteps.SdoTrail();
      await JudgeApiSteps.GenerateDirectionsOrderFreeFormOrder();
      await CaseworkerApiSteps.ConfirmOrderReview();
      await CaseworkerApiSteps.RecordJudgmentDeterMeansImmediately();
      await CaseworkerApiSteps.EditJudgmentDeterMeansSetDate();
      // await ClaimantSolicitorSpecApiSteps.JudgmentPaidInFull();
    });

    // DTSCCI-5198: referToJudgeDefenceReceived is not a migrated judgment handler.
    test('Refer To Judge Spec claim 1v1 Defence Received In Time', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      JudgeApiSteps,
      CaseworkerApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.RespondFastFullDefence();
      await ClaimantSolicitorSpecApiSteps.RespondFastRejectFullDefence();
      await JudgeApiSteps.SdoTrail();
      await JudgeApiSteps.GenerateDirectionsOrderFreeFormOrder();
      await CaseworkerApiSteps.ConfirmOrderReview();
      await CaseworkerApiSteps.RecordJudgmentDeterMeansImmediately();
      await CaseworkerApiSteps.ReferJudgeDefenceReceived();
    });
  },
);
