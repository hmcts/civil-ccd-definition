import { test } from '../../../playwright-fixtures/index';

test.describe('1v1 unspec intermediate track api journey',  async () => {
  test('1v1 Create Unspecified Inter Track claim', async ({
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1ApiSteps,
    JudgeApiSteps,
    HearingCenterAdminApiSteps,
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaimInter1v1();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.NotifyClaim();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails();
    await DefendantSolicitor1ApiSteps.RespondInterFullDefence();
    await ClaimantSolicitorApiSteps.RespondInterProceed();
    await JudgeApiSteps.GenerateDirectionsOrderInter();
    await DefendantSolicitor1ApiSteps.EvidenceUploadFast();
    await HearingCenterAdminApiSteps.ScheduleHearingFastTrial();
  });
});
