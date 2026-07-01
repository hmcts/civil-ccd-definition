import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 discontinue claim after hearing scheduled',
  { tag: ['@civil-ccd-nightly'] },
  () => {
    test('1v1 Discontinue This Claim After Hearing Schedule - Full discontinuance', async ({
      ClaimantSolicitorSteps,
      ClaimantSolicitorApiSteps,
      DefendantSolicitor1ApiSteps,
      JudgeSteps,
      HearingCenterAdminApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimFastTrack1v1();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.AmendClaimDocuments();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.RespondFastFullDefence();
      await ClaimantSolicitorApiSteps.RespondFastTrackProceed();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.SdoFastTrack();
      await ClaimantSolicitorApiSteps.EvidenceUploadFastTrack();
      await DefendantSolicitor1ApiSteps.EvidenceUploadFastTrack();
      await HearingCenterAdminApiSteps.ScheduleHearingFastTrackTrial();
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.DiscontinueClaim1v1();
    });
  },
);
