import { test } from '../../playwright-fixtures/index';

test.describe('1v2SS Small Track', async () => {
  test('Defendant Full Defence Claimant Intent To Proceed', async ({
    ClaimantSolicitorSteps,
    DefendantSolicitor1Steps,
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
  }) => {
    await ClaimantSolicitorSteps.Login();
    await ClaimantSolicitorSteps.CreateClaimSmallTrack1v2SS();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorSteps.NotifyClaim();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorSteps.NotifyClaimDetails();
    await DefendantSolicitor1Steps.Login();
    await DefendantSolicitor1Steps.RespondSmallTrackFullDefence1v2SS();
    await ClaimantSolicitorSteps.Login();
    await ClaimantSolicitorSteps.RespondSmallClaimIntentToProceed1v2SS();
  });
});
