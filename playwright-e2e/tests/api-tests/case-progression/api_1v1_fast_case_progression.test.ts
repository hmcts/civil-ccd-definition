import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 fast case progression api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v1 full defence unspecified - judge draws fast track WITH sum of damages (fast track - trail) - hearing scheduled', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      HearingCenterAdminApiSteps,
      JudgeSteps,
      JudgeApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimFastTrack1v1();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.AmendClaimDocuments();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.RespondFastTrackFullDefence();
      await ClaimantSolicitorApiSteps.RespondFastTrackFullDefence();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.SdoTrail();
      await ClaimantSolicitorApiSteps.EvidenceUploadFastTrack();
      await DefendantSolicitor1ApiSteps.EvidenceUploadFastTrack();
      await HearingCenterAdminApiSteps.ScheduleHearingFastTrackTrial();
      await HearingCenterAdminApiSteps.AmendHearingDueDate();
      await ClaimantSolicitorApiSteps.MakePaymentForHearingFee();
      await JudgeApiSteps.GenerateDirectionsOrderAssistedOrder();
    });

    test('1v1 full defence unspecified - judge draws fast track WITHOUT sum of damages (fast track) - hearing scheduled', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      HearingCenterAdminApiSteps,
      JudgeSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimFastTrack1v1();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.AmendClaimDocuments();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.RespondFastTrackFullDefence();
      await ClaimantSolicitorApiSteps.RespondFastTrackFullDefence();
      await JudgeSteps.LoginRegion1()
      await JudgeSteps.SdoFastTrack();
      await ClaimantSolicitorApiSteps.EvidenceUploadFastTrack();
      await DefendantSolicitor1ApiSteps.EvidenceUploadFastTrack();
      await HearingCenterAdminApiSteps.ScheduleHearingFastTrackTrial();
      await HearingCenterAdminApiSteps.AmendHearingDueDate();
      await ClaimantSolicitorApiSteps.MakePaymentForHearingFee();
    });
  },
);
