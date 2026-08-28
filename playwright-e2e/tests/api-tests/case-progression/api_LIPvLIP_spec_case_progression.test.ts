import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 LIP v LIP and LR v LIP spec api journeys',
  
  async () => {
    test('1v1 LiP v LiP Case Progression Journey', async ({
      ClaimantCitizenApiSteps,
      DefendantCitizenApiSteps,
      CaseRoleAssignmentApiSteps,
      JudgeApiSteps,
      HearingCenterAdminApiSteps
    }) => {
      await ClaimantCitizenApiSteps.CreateLipClaimFast();
      await ClaimantCitizenApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
      await DefendantCitizenApiSteps.RespondFastFullDefence();
      await ClaimantCitizenApiSteps.RespondFastRejectFullDefence();
      await JudgeApiSteps.SdoFast();
      await ClaimantCitizenApiSteps.EvidenceUpload();
      await DefendantCitizenApiSteps.EvidenceUpload();
      await HearingCenterAdminApiSteps.ScheduleHearingFastTrialWA();
      await ClaimantCitizenApiSteps.TrailReadiness();
      await DefendantCitizenApiSteps.TrailReadiness();
      await JudgeApiSteps.GenerateDirectionsOrderFreeForm();
    });
  },
);
