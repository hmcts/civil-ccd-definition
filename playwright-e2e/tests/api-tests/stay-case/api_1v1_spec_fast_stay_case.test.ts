import { test } from '../../../playwright-fixtures/index';

test.describe('1v1 spec stay case api journey', { tag: '@civil-service-nightly' }, async () => {
  test('1v1 LR FAST TRACK prepare for conduct hearing stay case', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecApiSteps,
    JudgeApiSteps,
    HearingCenterAdminApiSteps,
    CaseworkerApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecApiSteps.RespondFastFullDefence();
    await ClaimantSolicitorSpecApiSteps.RespondFastRejectFullDefence();
    await JudgeApiSteps.SdoFast();
    await HearingCenterAdminApiSteps.ScheduleHearingFastTrial();
    await HearingCenterAdminApiSteps.AmendHearingDueDate();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForHearingFee();
    await HearingCenterAdminApiSteps.StayCase();
    await HearingCenterAdminApiSteps.ManageStayRequestUpdate();
    await CaseworkerApiSteps.SendMessage();
    await JudgeApiSteps.ReplyMessage();
    await CaseworkerApiSteps.ReplyMessage();
    await HearingCenterAdminApiSteps.ManageStayLiftStay();
    await HearingCenterAdminApiSteps.ScheduleHearingFastTrial();
    await HearingCenterAdminApiSteps.DismissCase();
  });
});
