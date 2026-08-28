import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 spec record judgment api test',
  
  async () => {
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

    test('Record Judgment Spec claim 1v1 with mark paid in full', async ({
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
      await JudgeApiSteps.GenerateDirectionsOrderFreeForm();
      await CaseworkerApiSteps.ConfirmOrderReview();
      await CaseworkerApiSteps.RecordJudgmentDeterMeansImmediately();
      await CaseworkerApiSteps.EditJudgmentDeterMeansSetDate();
      // await ClaimantSolicitorSpecApiSteps.JudgmentPaidInFull();
    });

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
      await JudgeApiSteps.GenerateDirectionsOrderFreeForm();
      await CaseworkerApiSteps.ConfirmOrderReview();
      await CaseworkerApiSteps.RecordJudgmentDeterMeansImmediately();
      await CaseworkerApiSteps.ReferJudgeDefenceReceived();
    });
  },
);
