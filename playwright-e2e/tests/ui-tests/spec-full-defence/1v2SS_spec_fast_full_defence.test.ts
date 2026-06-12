import { test } from '../../../playwright-fixtures/index';

test.describe('1v2SS spec fast track claim journey', { tag: '@civil-ccd-nightly' }, async () => {
  test.only('1v2DS spec fast track claim journey', async ({
    DefendantSolicitor1SpecSteps,
    CaseRoleAssignmentApiSteps,
    ClaimantSolicitorApiSteps,
    ClaimantSolicitorSpecSteps,
  }) => {
    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.CreateClaimFastTrack1v2SS();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
    await DefendantSolicitor1SpecSteps.Login();
    await DefendantSolicitor1SpecSteps.RespondFastTrackFullDefence1v2SS();
    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.RespondFastTrackIntentToProceed1v2SS();
  });
});
