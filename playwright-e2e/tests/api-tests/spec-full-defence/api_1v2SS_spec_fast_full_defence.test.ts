import { test } from '../../../playwright-fixtures/index';

test.describe('1v2SS spec api fast track journeys', { tag: '@civil-service-nightly' }, async () => {
  test('1v2SS full defence and claimant response', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFastTrack1v2SS();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecApiSteps.RespondFastTrackFullDefence1v2SS();
    await ClaimantSolicitorSpecApiSteps.RespondFastTrackIntentToProceed1v2SS();
  });

  test('1v2SS fast claim full defence and not proceed', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFastTrack1v2SS();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecApiSteps.RespondFastTrackFullDefence1v2SS();
    await ClaimantSolicitorSpecApiSteps.RespondFastTrackDoNotProceed1v2SS();
  });
});
