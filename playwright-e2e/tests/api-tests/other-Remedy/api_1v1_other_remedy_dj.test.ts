import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 unspec api journey for DJ Other Remedy claim type fast track',
  
  async () => {
    test('1v1 unspec fast other remedy default judgement', async ({
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
    JudgeApiSteps,
    DefendantSolicitor1ApiSteps,
    HearingCenterAdminApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimFastOtherRemedy1v1();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await ClaimantSolicitorApiSteps.AmendRespondent1ResponseDeadline();
      await ClaimantSolicitorApiSteps.DefaultJudgementOtherRemedy();
      await JudgeApiSteps.SdoDJTrail();
      await ClaimantSolicitorApiSteps.EvidenceUploadFast();
      await DefendantSolicitor1ApiSteps.EvidenceUploadFast();
      await HearingCenterAdminApiSteps.ScheduleHearingFastTrialWA();
      await HearingCenterAdminApiSteps.AmendHearingDueDate();
      await ClaimantSolicitorApiSteps.MakePaymentForHearingFee();
      await JudgeApiSteps.GenerateDirectionsOrderAssisted();
      await ClaimantSolicitorApiSteps.ConfirmTrialArrangements();
    });
  },
);
