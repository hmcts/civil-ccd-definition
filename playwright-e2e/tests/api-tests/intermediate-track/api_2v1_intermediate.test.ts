import { test } from '../../../playwright-fixtures/index';

test.describe('2v1 unspec intermediate track api journey',  async () => {
  test('2v1 Create Unspecified Inter Track claim', async ({
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1ApiSteps,
    JudgeApiSteps,
    HearingCenterAdminApiSteps
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaimInter2v1();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.NotifyClaim();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails();
    await DefendantSolicitor1ApiSteps.RespondInterFullDefence2v1();
    await ClaimantSolicitorApiSteps.RespondInterProceed2v1();
    await JudgeApiSteps.GenerateDirectionsOrderInter();
    await DefendantSolicitor1ApiSteps.EvidenceUploadFast();
    await HearingCenterAdminApiSteps.ScheduleHearingFastTrial();
  });
});
