import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe('1v2DS stay case api journey', { tag: '@civil-service-nightly' }, async () => {
  test('1v2DS Stay Case Judicial Referral', async ({
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1ApiSteps,
    DefendantSolicitor2ApiSteps,
    JudgeApiSteps,
    HearingCenterAdminApiSteps,
    CaseworkerApiSteps,
    CtscAdminApiSteps,
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaim({
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      claimTrack: ClaimTrack.MULTI_CLAIM,
    });
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
    await CtscAdminApiSteps.SendMessage();
    await JudgeApiSteps.ReplyMessage();
    await CaseworkerApiSteps.ReplyMessage();
    await HearingCenterAdminApiSteps.ManageStayLiftStay();
    await JudgeApiSteps.GenerateDirectionsOrderMulti();
    await HearingCenterAdminApiSteps.ScheduleHearingFastTrial();
    await HearingCenterAdminApiSteps.DismissCase();
  });
});
