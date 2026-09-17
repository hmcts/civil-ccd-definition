import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  'CCD 1v2 Unspec fast hearings API test',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v2DS full defence defendant and claimant response', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      DefendantSolicitor2ApiSteps,
      HearingCenterAdminApiSteps,
      JudgeApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaim({
        claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
        claimTrack: ClaimTrack.FAST_CLAIM,
      });
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.RespondFastFullDefence();
      await DefendantSolicitor2ApiSteps.RespondFastFullDefence();
      await ClaimantSolicitorApiSteps.RespondFastProceed1v2DS();
      await HearingCenterAdminApiSteps.CreateCaseFlagCaseLevel();
      await HearingCenterAdminApiSteps.CreateCaseFlagClaimant1();
      await JudgeApiSteps.SdoFast();
      await HearingCenterAdminApiSteps.GenerateHearingsPayload();
    });
  },
);
