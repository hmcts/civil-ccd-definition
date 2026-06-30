import { test } from '../../../playwright-fixtures/index';

test.describe(
  '2v1 discontinue claim after hearing scheduled',
  { tag: ['@civil-ccd-nightly'] },
  () => {
    test('2v1 discontinue this claim after hearing schedule - full discontinuance', async ({
      ClaimantSolicitorSteps,
      ClaimantSolicitorApiSteps,
      DefendantSolicitor1ApiSteps,
      JudgeSteps,
      HearingCenterAdminApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimFastTrack2v1();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1ApiSteps.RespondFastTrackFullDefence2v1();
      await ClaimantSolicitorApiSteps.RespondFastTrackProceed2v1();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.SdoFastTrack();
      await HearingCenterAdminApiSteps.ScheduleHearingFastTrackTrial();
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.DiscontinueClaim2v1();
    });
  },
);
