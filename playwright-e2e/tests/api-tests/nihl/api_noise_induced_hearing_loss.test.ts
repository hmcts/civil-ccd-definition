import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe(
  'Noise Induced Hearing Loss API test - fast claim - unspec',
  { tag: ['@civil-service-nightly', '@api-nihl'] },
  async () => {
    test('1v1 unspec create SDO for Noise Induced Hearing Loss', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      HearingCenterAdminApiSteps,
      JudgeApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimFastNIHL1v1();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.AmendClaimDocuments();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.DefendantResponse({ claimTrack: ClaimTrack.FAST_CLAIM });
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
