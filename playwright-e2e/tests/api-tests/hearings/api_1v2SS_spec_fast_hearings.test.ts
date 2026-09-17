import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  'CCD 1v2 Spec fast hearings API test',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v2 fast claim full defence', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      HearingCenterAdminApiSteps,
      JudgeApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({
        claimTrack: ClaimTrack.FAST_CLAIM,
        claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.RespondFastFullDefence1v2SS();
      await ClaimantSolicitorSpecApiSteps.RespondFastRejectFullDefence1v2SS();
      await HearingCenterAdminApiSteps.CreateCaseFlagCaseLevel();
      await HearingCenterAdminApiSteps.CreateCaseFlagClaimant1();
      await JudgeApiSteps.SdoFast();
      await HearingCenterAdminApiSteps.GenerateHearingsPayloadSpec();
    });
  },
);
