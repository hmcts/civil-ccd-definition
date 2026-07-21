import { test } from '../../../playwright-fixtures/index';

test.describe('1v1 case flags api journey @debug', { tag: '@civil-service-nightly' }, async () => {
  test('1v1 case flags', async ({
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1ApiSteps,
    HearingCenterAdminApiSteps,
  }) => {
    // await ClaimantSolicitorApiSteps.CreateClaimFast1v1();
    // await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    // await ClaimantSolicitorApiSteps.NotifyClaim();
    // await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    // await ClaimantSolicitorApiSteps.NotifyClaimDetails();
    // await DefendantSolicitor1ApiSteps.RespondFastFullDefence();
    // await ClaimantSolicitorApiSteps.RespondFastProceed();
    // await HearingCenterAdminApiSteps.CreateCaseFlagCaseLevel();
    // await HearingCenterAdminApiSteps.CreateCaseFlagClaimant1();
    // await HearingCenterAdminApiSteps.CreateCaseFlagDefendant1();
    await HearingCenterAdminApiSteps.ManageCaseFlagCaseLevel();
    await HearingCenterAdminApiSteps.ManageCaseFlagClaimant1();
    await HearingCenterAdminApiSteps.ManageCaseFlagDefendant1();
  });
});
