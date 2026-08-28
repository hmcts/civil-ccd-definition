import { test } from '../../../playwright-fixtures/index';

test.describe('LR v LIP spec stay case api journey',  async () => {
  test('LR v LIP spec stay case', async ({
    ClaimantSolicitorSpecApiSteps,
    DefendantCitizenApiSteps,
    CaseRoleAssignmentApiSteps,
    JudgeApiSteps,
    HearingCenterAdminApiSteps,
    CaseworkerApiSteps,
    CtscAdminApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmall1vLIP();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
    await DefendantCitizenApiSteps.RespondSmallFullDefence();
    await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence();
    await HearingCenterAdminApiSteps.StayCase();
    await HearingCenterAdminApiSteps.ManageStayRequestUpdate();
    await CtscAdminApiSteps.SendMessage();
    await JudgeApiSteps.ReplyMessage();
    await CaseworkerApiSteps.ReplyMessage();
    await HearingCenterAdminApiSteps.ManageStayLiftStay();
    await JudgeApiSteps.SdoSmallSum();
    await HearingCenterAdminApiSteps.DismissCase();
  });
});
