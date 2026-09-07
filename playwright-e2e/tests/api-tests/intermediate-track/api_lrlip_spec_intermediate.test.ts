import { test } from '../../../playwright-fixtures/index';

test.describe('1v1 LIP v LIP and LR v LIP spec api journeys', { tag: '@civil-service-nightly' }, async () => {
  test.fail('1v1 LR v LiP intermediate track', async ({
    ClaimantSolicitorSpecApiSteps,
    DefendantCitizenApiSteps,
    CaseRoleAssignmentApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimInter1vLIP();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
    await DefendantCitizenApiSteps.RespondInterFullDefence();
    await ClaimantSolicitorSpecApiSteps.RespondInterRejectFullDefence();
  });
});
