import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track.ts';

test.describe('1v1 spec case flags api journey', { tag: '@civil-service-nightly' }, async () => {
  test('1v1 spec case flags', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecApiSteps,
    HearingCenterAdminApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaim({ claimTrack: ClaimTrack.FAST_CLAIM });
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecApiSteps.RespondFastFullDefence();
    await ClaimantSolicitorSpecApiSteps.RespondFastRejectFullDefence();
    await HearingCenterAdminApiSteps.CreateCaseFlagCaseLevel();
    await HearingCenterAdminApiSteps.CreateCaseFlagClaimant1();
    await HearingCenterAdminApiSteps.CreateCaseFlagDefendant1();
    await HearingCenterAdminApiSteps.ManageCaseFlagCaseLevel();
    await HearingCenterAdminApiSteps.ManageCaseFlagClaimant1();
    await HearingCenterAdminApiSteps.ManageCaseFlagDefendant1();
  });
});
