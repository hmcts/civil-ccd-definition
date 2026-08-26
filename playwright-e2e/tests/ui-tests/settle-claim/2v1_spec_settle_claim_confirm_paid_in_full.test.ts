import { test } from '../../../playwright-fixtures';

test.describe('2v1 spec settle claim confirm paid in full',  () => {
  test('2v1 spec - settle claim - confirm paid in full', async ({
    ClaimantSolicitorSpecApiSteps,
    DefendantSolicitor1SpecApiSteps,
    CaseRoleAssignmentApiSteps,
    CaseworkerApiSteps,
    LegalAdvisorApiSteps,
    ClaimantSolicitorSpecSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmall2v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecApiSteps.RespondSmallFullDefence2v1();
    await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence2v1();
    await CaseworkerApiSteps.MediationUnsuccessful();
    await LegalAdvisorApiSteps.SdoSmallNoSum();
    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.SettleClaimMarkPaidInFull2v1();
  });
});
