import { test } from '../../../playwright-fixtures/index';

test.describe('1v2SS stay case api journey', { tag: '@civil-service-nightly' }, async () => {
  test('1v2SS LR UNSPEC claim hearing readiness', async ({
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
    HearingCenterAdminApiSteps,
    JudgeApiSteps,
    CaseworkerApiSteps,
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaimFast1v2SS();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.NotifyClaim();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails();
    await ClaimantSolicitorApiSteps.AmendRespondent1ResponseDeadline();
    await ClaimantSolicitorApiSteps.DefaultJudgement1v2SS();
    await JudgeApiSteps.SdoDJTrail();
    await HearingCenterAdminApiSteps.ScheduleHearingFastTrial();
    await HearingCenterAdminApiSteps.StayCase();
    await HearingCenterAdminApiSteps.ManageStayRequestUpdate();
    await CaseworkerApiSteps.SendMessage();
    await JudgeApiSteps.ReplyMessage();
    await CaseworkerApiSteps.ReplyMessage();
    await HearingCenterAdminApiSteps.ManageStayLiftStay();
    await HearingCenterAdminApiSteps.DismissCase();
  });
});
