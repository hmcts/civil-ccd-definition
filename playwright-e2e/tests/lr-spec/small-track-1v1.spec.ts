import { test } from '../../playwright-fixtures/index';

test.describe('Specified Small Track 1v1', async () => {
  test('Defendant Full Defence Claimant Intent To Proceed', async ({
    ClaimantSolicitorSpecSteps,
    DefendantSolicitor1SpecSteps,
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
  }) => {
    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.CreateClaimSmallTrack1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecSteps.Login();
    await DefendantSolicitor1SpecSteps.RespondSmallTrackFullDefence1v1();
    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.RespondSmallClaimIntentToProceed1v1();
  });
});

test.describe('Specified Small Track 1v1 With Default Judgment ', async () => {
  test('Defendant Full Defence Claimant Intent To Proceed With Default Judgment', async ({
    ClaimantSolicitorSpecSteps,
    ClaimantSolicitorSpecApiSteps,
  }) => {
    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.CreateClaimSmallTrack1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorSpecApiSteps.AmendRespondent1ResponseDeadline();
    await ClaimantSolicitorSpecSteps.RequestDefaultJudgment();
  });
});
