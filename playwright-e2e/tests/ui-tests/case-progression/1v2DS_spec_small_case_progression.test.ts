import { test } from '../../../playwright-fixtures/index';

test.describe('1v2 spec small case progression', { tag: '@civil-ccd-nightly' }, () => {
  test.only('1v2 spec small case progression', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecSteps,
    DefendantSolicitor2SpecSteps,
    JudgeSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFastTrack1v2DS();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
    await DefendantSolicitor1SpecSteps.Login();
    await DefendantSolicitor1SpecSteps.RespondFastTrackFullDefence1v2DS();
    await DefendantSolicitor2SpecSteps.Login();
    await DefendantSolicitor2SpecSteps.RespondFastTrackFullDefence1v2DS();
    await JudgeSteps.SdoSmallTrack();

    // Upload evidence as claimant solicitor
    // Upload evidence as defendant solicitor
    // Schedule a hearing
    // API pay hearing fee (make changes to same classes that handle claim issued payment)
  });
});
