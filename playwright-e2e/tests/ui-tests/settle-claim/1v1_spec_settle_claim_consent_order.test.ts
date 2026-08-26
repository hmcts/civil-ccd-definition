import { test } from '../../../playwright-fixtures';

test.describe('1v1 spec settle claim consent order',  () => {
  test('1v1 spec - settle claim - reason for settlement - consent order', async ({
    ClaimantSolicitorSpecApiSteps,
    DefendantSolicitor1SpecApiSteps,
    CaseRoleAssignmentApiSteps,
    CaseworkerApiSteps,
    LegalAdvisorApiSteps,
    HearingCenterAdminSpecSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmall1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecApiSteps.RespondSmallFullDefence();
    await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence();
    await CaseworkerApiSteps.MediationUnsuccessful();
    await LegalAdvisorApiSteps.SdoSmallNoSum();
    await HearingCenterAdminSpecSteps.LoginRegion1();
    await HearingCenterAdminSpecSteps.SettleClaimConsentOrder();
  });
});
