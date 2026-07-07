import { test } from '../../../playwright-fixtures';

test.describe('1v1 spec settle claim confirm paid in full', { tag: ['@civil-ccd-nightly'] }, () => {
  test('1v1 spec - settle claim - confirm paid in full', async ({
    ClaimantSolicitorSpecApiSteps,
    DefendantSolicitor1SpecApiSteps,
    CaseRoleAssignmentApiSteps,
    CaseworkerApiSteps,
    LegalAdvisorSteps,
    ClaimantSolicitorSpecSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmallTrack1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecApiSteps.RespondSmallFullDefence();
    await ClaimantSolicitorSpecApiSteps.RespondSmallFullDefenceProceed();
    await CaseworkerApiSteps.MediationUnsuccessful();
    await LegalAdvisorSteps.LoginRegion1();
    await LegalAdvisorSteps.SdoSmallTrackNoSum();
    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.SettleClaimConfirmPaidInFull1v1();
  });
});
