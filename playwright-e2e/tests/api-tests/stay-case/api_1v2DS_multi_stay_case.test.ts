import { test } from '../../../playwright-fixtures/index';

test.describe('1v2DS stay case api journey', { tag: '@civil-service-nightly' }, async () => {
  test('1v2DS Stay Case Judicial Referral', async ({
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1ApiSteps,
    DefendantSolicitor2ApiSteps,
    JudgeApiSteps,
    HearingCenterAdminApiSteps,
    CaseworkerApiSteps,
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaimMulti1v2DS();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.NotifyClaim();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails();
    await DefendantSolicitor1ApiSteps.RespondMultiFullDefence();
    await DefendantSolicitor2ApiSteps.RespondMultiFullDefence();
    await ClaimantSolicitorApiSteps.RespondMultiProceed1v2DS();
    await HearingCenterAdminApiSteps.StayCase();
    await HearingCenterAdminApiSteps.ManageStayRequestUpdate();
    await CaseworkerApiSteps.SendMessage();
    await JudgeApiSteps.ReplyMessage();
    await CaseworkerApiSteps.ReplyMessage();
    await HearingCenterAdminApiSteps.ManageStayLiftStay();
    await JudgeApiSteps.GenerateDirectionsOrderMulti();
    await HearingCenterAdminApiSteps.ScheduleHearingFastTrial();
    await HearingCenterAdminApiSteps.DismissCase();
  });
});
