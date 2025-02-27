import { test } from '../../playwright-fixtures/index';

test.describe('1v1 Fast track', async () => {
  test('Defendant Full Defence Claimant Intent To Proceed', async ({
    ClaimantSolicitorSteps,
    DefendantSolicitor1Steps,
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
  }) => {
    await ClaimantSolicitorSteps.Login();
    await ClaimantSolicitorSteps.CreateClaimFastTrack1v1();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorSteps.NotifyClaim();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorSteps.NotifyClaimDetails();
    await DefendantSolicitor1Steps.Login();
    await DefendantSolicitor1Steps.RespondFastTrackFullDefence1v1();
    await ClaimantSolicitorSteps.Login();
    await ClaimantSolicitorSteps.RespondFastTrackIntentToProceed1v1();
  });
});
