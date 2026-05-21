import { test } from '../../../playwright-fixtures/index';

test.describe('2v1 spec full defence api journey', { tag: '@civil-service-nightly' }, async () => {
  test('2v1 spec full defence', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFastTrack2v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecApiSteps.RespondFastTrackFullDefence2v1();
    await ClaimantSolicitorSpecApiSteps.RespondFastTrackIntentToProceed2v1();
  });
});
