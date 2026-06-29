import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 small case progression api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v1 full defence unspecified - judge draws small claims WITH sum of damages - hearing scheduled', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      HearingCenterAdminApiSteps,
      JudgeSteps,
      JudgeApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimSmallTrack1v1();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.AmendClaimDocuments();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.RespondSmallTrackFullDefence();
      await ClaimantSolicitorApiSteps.RespondSmallTrackProceed();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.SdoSmallTrackSum();
      await ClaimantSolicitorApiSteps.EvidenceUploadSmallTrack();
      await DefendantSolicitor1ApiSteps.EvidenceUploadSmallClaim();
      await HearingCenterAdminApiSteps.ScheduleHearingSmallClaimTrail();
      await HearingCenterAdminApiSteps.AmendHearingDueDate();
      await ClaimantSolicitorApiSteps.MakePaymentForHearingFee();
      await JudgeApiSteps.GenerateDirectionsOrderFreeFormOrder();
    });

    test('1v1 full defence unspecified - judge draws small claims WITHOUT sum of damages - hearing scheduled', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      HearingCenterAdminApiSteps,
      JudgeSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimSmallTrack1v1();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.AmendClaimDocuments();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.RespondSmallTrackFullDefence();
      await ClaimantSolicitorApiSteps.RespondSmallTrackProceed();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.SdoSmallTrackNoSum();
      await ClaimantSolicitorApiSteps.EvidenceUploadSmallTrack();
      await DefendantSolicitor1ApiSteps.EvidenceUploadSmallClaim();
      await HearingCenterAdminApiSteps.ScheduleHearingSmallClaimTrail();
      await HearingCenterAdminApiSteps.AmendHearingDueDate();
      await ClaimantSolicitorApiSteps.MakePaymentForHearingFee();
    });
  },
);
