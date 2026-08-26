import { test } from '../../../playwright-fixtures/index';

test.describe('2v1 spec discontinue claim',  () => {
  test('2v1 spec discontinue this claim - full discontinuance', async ({
    ClaimantSolicitorSpecSteps,
    ClaimantSolicitorSpecApiSteps,
    DefendantSolicitor1SpecSteps,
    CaseRoleAssignmentApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmall2v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecSteps.Login();
    await DefendantSolicitor1SpecSteps.RespondSmallFullDefence2v1();
    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.RespondSmallProceed2v1();
    await ClaimantSolicitorSpecSteps.DiscontinueClaim2v1();
  });
});
