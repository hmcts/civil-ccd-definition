import { test } from '../../../playwright-fixtures';

test.describe('2v1 spec settle claim judges order',  () => {
  test(`2v1 spec - settle claim - reason for settlement - following judge's order`, async ({
    ClaimantSolicitorSpecApiSteps,
    DefendantSolicitor1SpecApiSteps,
    CaseRoleAssignmentApiSteps,
    CaseworkerApiSteps,
    LegalAdvisorApiSteps,
    HearingCenterAdminSpecSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmall2v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecApiSteps.RespondSmallFullDefence2v1();
    await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence2v1();
    await CaseworkerApiSteps.MediationUnsuccessful();
    await LegalAdvisorApiSteps.SdoSmallNoSum();
    await HearingCenterAdminSpecSteps.LoginRegion2();
    await HearingCenterAdminSpecSteps.SettleClaimJudgesOrder();
  });
});
