import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe(
  '1v1 discontinue claim after hearing scheduled',
  { tag: ['@civil-ccd-nightly', '@ui-discontinue-claim'] },
  () => {
    test('1v1 Discontinue This Claim After Hearing Schedule - Full discontinuance', async ({
      ClaimantSolicitorSteps,
      ClaimantSolicitorApiSteps,
      DefendantSolicitor1ApiSteps,
      JudgeApiSteps,
      HearingCenterAdminApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimFast1v1();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.AmendClaimDocuments();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.DefendantResponse();
      await ClaimantSolicitorApiSteps.RespondFastProceed();
      await JudgeApiSteps.SdoFast();
      await ClaimantSolicitorApiSteps.EvidenceUploadFast();
      await DefendantSolicitor1ApiSteps.EvidenceUploadFast();
      await HearingCenterAdminApiSteps.ScheduleHearingFastTrialWA();
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.DiscontinueClaim1v1();
    });
  },
);
