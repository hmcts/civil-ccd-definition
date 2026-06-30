import { test } from '../../../playwright-fixtures/index';

test.describe('1v2DS spec discontinue claim', { tag: ['@civil-ccd-nightly'] }, () => {
  test('1v2DS spec discontinue this claim - full discontinuance', async ({
    ClaimantSolicitorSpecSteps,
    ClaimantSolicitorSpecApiSteps,
    DefendantSolicitor1SpecApiSteps,
    DefendantSolicitor2SpecApiSteps,
    DefendantSolicitor2SpecSteps,
    CaseRoleAssignmentApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmallTrack1v2DS();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
    await DefendantSolicitor1SpecApiSteps.RespondSmallTrackFullDefence1v2DS();
    await DefendantSolicitor2SpecApiSteps.RespondSmallTrackFullDefence();
    await ClaimantSolicitorSpecApiSteps.RespondSmallClaimProceed1v2DS();
    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.DiscontinueClaim1v2DS();
  });
});
