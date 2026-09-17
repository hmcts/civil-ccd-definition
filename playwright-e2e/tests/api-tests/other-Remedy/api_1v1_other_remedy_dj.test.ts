import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimTypeUnspec from '../../../constants/ccd-events/ccd-events/create-claim/claim-type-unspec';

test.describe(
  '1v1 unspec api journey for DJ Other Remedy claim type fast track',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v1 unspec fast other remedy default judgement', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      JudgeApiSteps,
      DefendantSolicitor1ApiSteps,
      HearingCenterAdminApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaim({
        claimTrack: ClaimTrack.FAST_CLAIM,
        claimTypeUnspec: ClaimTypeUnspec.HOUSING_DISREPAIR,
      });
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await ClaimantSolicitorApiSteps.AmendRespondent1ResponseDeadline();
      await ClaimantSolicitorApiSteps.DefaultJudgementOtherRemedy();
      await JudgeApiSteps.SdoDJTrail();
      await ClaimantSolicitorApiSteps.EvidenceUploadFast();
      await DefendantSolicitor1ApiSteps.EvidenceUploadFast();
      await HearingCenterAdminApiSteps.ScheduleHearingFastTrialWA();
      await HearingCenterAdminApiSteps.AmendHearingDueDate();
      await ClaimantSolicitorApiSteps.MakePaymentForHearingFee();
      await JudgeApiSteps.GenerateDirectionsOrderAssisted();
      await ClaimantSolicitorApiSteps.ConfirmTrialArrangements();
    });
  },
);
