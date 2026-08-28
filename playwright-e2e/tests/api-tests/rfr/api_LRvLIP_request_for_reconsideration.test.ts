import { test } from '../../../playwright-fixtures/index';

test.describe('LRvLIP spec request for reconsideration api journeys',  async () => {
  test('1v1 LR v LiP Request for reconsideration', async ({
    ClaimantSolicitorSpecApiSteps,
    DefendantCitizenApiSteps,
    CaseRoleAssignmentApiSteps,
    CaseworkerApiSteps,
    LegalAdvisorApiSteps,
    JudgeApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmall1vLIP();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
    await DefendantCitizenApiSteps.RespondSmallFullDefence();
    await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence();
    await CaseworkerApiSteps.MediationUnsuccessful();
    await LegalAdvisorApiSteps.SdoSmallNoSum();
    await DefendantCitizenApiSteps.RequestForReconsideration();
    await JudgeApiSteps.DecisionOnReconsiderationRequestSdo();
  });
});
