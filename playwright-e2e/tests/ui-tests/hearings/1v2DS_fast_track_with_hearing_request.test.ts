import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v2DS fast track with hearing request @debug',
  {
    tag: ['@civil-ccd-nightly'],
  },
  () => {
    test('1v2DS create fast track with hearing request', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      DefendantSolicitor2ApiSteps,
      JudgeSteps,
      HearingCenterAdminSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimFastTrack1v2DS();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.RespondFastTrackFullDefence1v2DS();
      await DefendantSolicitor2ApiSteps.RespondFastTrackFullDefence1v2DS();
      await ClaimantSolicitorApiSteps.RespondFastTrackProceed1v2DS();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.SdoFastTrack();
      await HearingCenterAdminSteps.LoginRegion1();
      await HearingCenterAdminSteps.RequestNewHearing();
      await HearingCenterAdminSteps.UpdateHearing();
      await HearingCenterAdminSteps.CancelHearing();
    });
  },
);
