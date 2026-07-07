import { test } from '../../../playwright-fixtures';

test.describe('1v1 spec settle claim judges order', { tag: ['@civil-ccd-nightly'] }, () => {
  test("1v1 spec - settle claim - reason for settlement - following judge's order", async ({
    ClaimantSolicitorSpecApiSteps,
    DefendantSolicitor1SpecApiSteps,
    CaseRoleAssignmentApiSteps,
    CaseworkerApiSteps,
    LegalAdvisorSteps,
    HearingCenterAdminSpecSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmallTrack1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecApiSteps.RespondSmallFullDefence();
    await ClaimantSolicitorSpecApiSteps.RespondSmallFullDefenceProceed();
    await CaseworkerApiSteps.MediationUnsuccessful();
    await LegalAdvisorSteps.LoginRegion1();
    await LegalAdvisorSteps.SdoSmallTrackNoSum();
    await HearingCenterAdminSpecSteps.LoginRegion1();
    await HearingCenterAdminSpecSteps.SettleClaimJudgesOrder();
  });
});
