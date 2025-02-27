import { test } from '../../playwright-fixtures/index';

test.describe('1v1 Specified Fast track', async () => {
  test('Defendant Full Defence Claimant Intent To Proceed', async ({
    ClaimantSolicitorSpecSteps,
    DefendantSolicitor1SpecSteps,
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
  }) => {
    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.CreateClaimFastTrack1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecSteps.Login();
    await DefendantSolicitor1SpecSteps.RespondFastTrackFullDefence1v1();
    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.RespondFastTrackIntentToProceed1v1();
  });
});
