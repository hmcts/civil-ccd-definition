import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe('1v1 spec record judgment api test', { tag: '@civil-service-nightly' }, async () => {
  test('SetAside Default Judgment after judgment error - Spec claim 1v1 - Case taken offline', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    CaseworkerApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaim({ claimTrack: ClaimTrack.FAST_CLAIM });
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
    await ClaimantSolicitorSpecApiSteps.CreateClaim({ claimTrack: ClaimTrack.FAST_CLAIM });
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
    await ClaimantSolicitorSpecApiSteps.CreateClaim({ claimTrack: ClaimTrack.FAST_CLAIM });
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
});
