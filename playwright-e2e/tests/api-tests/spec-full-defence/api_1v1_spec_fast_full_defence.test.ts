import { test } from '../../../playwright-fixtures/index';

test.describe('1v1 spec full defence api journey', { tag: '@civil-service-nightly' }, async () => {
  test('1v1 spec full defence', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFastTrack1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecApiSteps.InformAgreedExtensionDateSpec();
    await DefendantSolicitor1SpecApiSteps.RespondFastTrackFullDefence1v1();
    await ClaimantSolicitorSpecApiSteps.RespondFastTrack1v1();
  });
});
