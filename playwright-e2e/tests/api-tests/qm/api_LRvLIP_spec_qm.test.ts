import { test } from '../../../playwright-fixtures/index';

test.describe('LR v LIP query management spec api journey', { tag: '@civil-service-nightly' }, async () => {
  test('LR v LIP query management spec', async ({
    ClaimantSolicitorSpecApiSteps,
    DefendantCitizenApiSteps,
    CaseRoleAssignmentApiSteps,
    JudgeApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFast1vLIP();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
    await DefendantCitizenApiSteps.RespondFastFullDefence();
    await ClaimantSolicitorSpecApiSteps.RespondFastRejectFullDefence();
    await JudgeApiSteps.SdoFast();
  });
});
