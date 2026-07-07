import { test } from '../../../playwright-fixtures';

test.describe('2v1 spec settle claim confirm paid in full', { tag: ['@civil-ccd-nightly'] }, () => {
  test('2v1 spec - settle claim - confirm paid in full', async ({
    ClaimantSolicitorSpecApiSteps,
    DefendantSolicitor1SpecApiSteps,
    CaseRoleAssignmentApiSteps,
    CaseworkerApiSteps,
    LegalAdvisorSteps,
    ClaimantSolicitorSpecSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmallTrack2v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecApiSteps.RespondSmallFullDefence2v1();
    await ClaimantSolicitorSpecApiSteps.RespondSmallFullDefenceProceed2v1();
    await CaseworkerApiSteps.MediationUnsuccessful();
    await LegalAdvisorSteps.LoginRegion1();
    await LegalAdvisorSteps.SdoSmallTrackNoSum();
    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.SettleClaimConfirmPaidInFull2v1();
  });
});
