import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimTypeUnspec from '../../../constants/ccd-events/ccd-events/create-claim/claim-type-unspec';
import PersonalInjuryType from '../../../constants/ccd-events/ccd-events/create-claim/personal-injury-type';

test.describe(
  'Noise Induced Hearing Loss API test - fast claim - unspec',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v1 unspec create SDO for Noise Induced Hearing Loss', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      HearingCenterAdminApiSteps,
      JudgeApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaim({
        claimTrack: ClaimTrack.FAST_CLAIM,
        claimTypeUnspec: ClaimTypeUnspec.PERSONAL_INJURY,
        personalInjuryType: PersonalInjuryType.NOISE_INDUCED_HEARING_LOSS,
      });
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.AmendClaimDocuments();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.RespondFastFullDefence();
      await ClaimantSolicitorApiSteps.RespondFastProceed();
      await JudgeApiSteps.SdoFastNIHL();
      await ClaimantSolicitorApiSteps.EvidenceUploadFast();
      await DefendantSolicitor1ApiSteps.EvidenceUploadFast();
      await HearingCenterAdminApiSteps.ScheduleHearingFastTrialWA();
      await HearingCenterAdminApiSteps.AmendHearingDueDate();
      await ClaimantSolicitorApiSteps.MakePaymentForHearingFee();
      await JudgeApiSteps.GenerateDirectionsOrderAssisted();
    });
  },
);
