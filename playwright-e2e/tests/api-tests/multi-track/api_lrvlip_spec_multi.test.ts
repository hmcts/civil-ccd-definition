import { test } from '../../../playwright-fixtures/index';

test.describe('1v1 LR v LiP multi track api journey', { tag: '@civil-service-nightly' }, async () => {
  test.fail('1v1 LR v LiP multi track', async ({
    ClaimantSolicitorSpecApiSteps,
    DefendantCitizenApiSteps,
    CaseRoleAssignmentApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimMulti1vLIP();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
    await DefendantCitizenApiSteps.RespondMultiFullDefence();
    await ClaimantSolicitorSpecApiSteps.RespondMultiRejectFullDefence();
  });
});
