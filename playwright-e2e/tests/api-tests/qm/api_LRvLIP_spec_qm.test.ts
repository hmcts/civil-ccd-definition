import { test } from '../../../playwright-fixtures/index';

test.describe('LR v LIP query management spec api journey', { tag: '@civil-service-nightly' }, async () => {
  test('LR v LIP query management spec', async ({
    ClaimantSolicitorSpecApiSteps,
    DefendantCitizenApiSteps,
    CaseRoleAssignmentApiSteps,
    JudgeApiSteps,
    CaseworkerApiSteps
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFast1vLIP();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
    await DefendantCitizenApiSteps.RespondFastFullDefence();
    await ClaimantSolicitorSpecApiSteps.RespondFastRejectFullDefence();
    await JudgeApiSteps.SdoFast();
    await ClaimantSolicitorSpecApiSteps.RaiseLRHearingQuery();
    await CaseworkerApiSteps.RespondToHearingQuery();
    await ClaimantSolicitorSpecApiSteps.FollowUpOnLRQuery();
    await DefendantCitizenApiSteps.RaiseLipQuery();
    await CaseworkerApiSteps.RespondToQuery();
    await DefendantCitizenApiSteps.FollowUpOnLipQuery();
  });
});
