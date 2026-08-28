import { test } from '../../../playwright-fixtures/index';

test.describe('LR v LIP query management spec api journey',  async () => {
  test('LR v LIP query management spec', async ({
    ClaimantSolicitorSpecApiSteps,
    DefendantCitizenApiSteps,
    CaseRoleAssignmentApiSteps,
    JudgeApiSteps,
    CtscAdminApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFast1vLIP();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
    await DefendantCitizenApiSteps.RespondFastFullDefence();
    await ClaimantSolicitorSpecApiSteps.RespondFastRejectFullDefence();
    await JudgeApiSteps.SdoFast();
    await ClaimantSolicitorSpecApiSteps.RaiseLRHearingQuery();
    await CtscAdminApiSteps.RespondToHearingQuery();
    await ClaimantSolicitorSpecApiSteps.FollowUpOnLRQuery();
    await DefendantCitizenApiSteps.RaiseLipQuery();
    await CtscAdminApiSteps.RespondToQuery();
    await DefendantCitizenApiSteps.FollowUpOnLipQuery();
  });
});
