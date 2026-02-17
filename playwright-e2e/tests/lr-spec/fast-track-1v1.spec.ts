import { test } from '../../playwright-fixtures/index';

test.describe('Specified Fast track 1v1', async () => {
  test('Defendant Full Defence Claimant Intent To Proceed', async ({
    ClaimantSolicitorSpecSteps,
    DefendantSolicitor1SpecSteps,
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    HearingCenterAdminSpecSteps,
    JudgeSteps,
    WaApiSteps,
  }) => {
    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.CreateClaimFastTrack1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecSteps.Login();
    await DefendantSolicitor1SpecSteps.RespondFastTrackFullDefence1v1();
    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.RespondFastTrackIntentToProceed1v1();

    await JudgeSteps.Login();
    await WaApiSteps.retrieveAssignWaTaskFastTrackDirections();

    // await HearingCenterAdminSpecSteps.LoginRegion1();
    // await HearingCenterAdminSpecSteps.CreateCaseLevelCaseFlag();
    // await HearingCenterAdminSpecSteps.CreateClaimant1CaseFlag();
    // await HearingCenterAdminSpecSteps.ManageCaseFlags();
  });

  test.only('Defendant Full Defence Claimant Intent To Proceed 2', async ({
    JudgeSteps,
    WaApiSteps,
  }) => {
    await JudgeSteps.Login();
    await WaApiSteps.retrieveAssignWaTaskFastTrackDirections();
  });
});
