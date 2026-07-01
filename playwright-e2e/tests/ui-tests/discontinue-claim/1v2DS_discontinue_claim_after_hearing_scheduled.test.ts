import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v2 discontinue claim after hearing scheduled',
  { tag: ['@civil-ccd-nightly'] },
  () => {
    test('1v2 discontinue this claim after hearing schedule - full discontinuance', async ({
      ClaimantSolicitorSteps,
      ClaimantSolicitorApiSteps,
      DefendantSolicitor1ApiSteps,
      DefendantSolicitor2ApiSteps,
      JudgeSteps,
      HearingCenterAdminApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimFastTrack1v2DS();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await DefendantSolicitor1ApiSteps.RespondFastFullDefence1v2DS();
      await DefendantSolicitor2ApiSteps.RespondFastFullDefence();
      await ClaimantSolicitorApiSteps.RespondFastTrackProceed1v2DS();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.SdoFastTrack();
      await HearingCenterAdminApiSteps.ScheduleHearingFastTrackTrial();
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.DiscontinueClaim1v2DS();
    });
  },
);
