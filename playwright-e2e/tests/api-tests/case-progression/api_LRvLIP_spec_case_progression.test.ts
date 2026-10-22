import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v1 LIP v LIP and LR v LIP spec api journeys',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v1 LR v LiP case progression', async ({
      ClaimantSolicitorSpecApiSteps,
      DefendantCitizenApiSteps,
      CaseRoleAssignmentApiSteps,
      JudgeApiSteps,
      HearingCenterAdminApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({
        claimTrack: ClaimTrack.FAST_CLAIM,
        claimType: ClaimType.ONE_VS_ONE_LIP,
      });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
      await DefendantCitizenApiSteps.RespondFastFullDefence();
      await ClaimantSolicitorSpecApiSteps.RespondFastRejectFullDefence();
      await JudgeApiSteps.SdoFast();
      await DefendantCitizenApiSteps.EvidenceUpload();
      await HearingCenterAdminApiSteps.ScheduleHearingFastTrialWA();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForHearingFee();
      await DefendantCitizenApiSteps.TrailReadiness();
      await JudgeApiSteps.GenerateDirectionsOrderFreeForm();
    });
  },
);
