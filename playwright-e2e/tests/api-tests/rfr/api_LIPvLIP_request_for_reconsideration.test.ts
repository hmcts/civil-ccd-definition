import { test } from '../../../playwright-fixtures/index';

test.describe(
  'LIPvLIP spec request for reconsideration api journeys',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v1 LiP v LiP Request for reconsideration', async ({
      ClaimantCitizenApiSteps,
      DefendantCitizenApiSteps,
      CaseRoleAssignmentApiSteps,
      LegalAdvisorApiSteps,
      CaseworkerApiSteps,
      JudgeApiSteps,
    }) => {
      await ClaimantCitizenApiSteps.CreateLipClaimSmall();
      await ClaimantCitizenApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
      await DefendantCitizenApiSteps.RespondSmallFullDefence();
      await ClaimantCitizenApiSteps.RespondSmallRejectFullDefence();
      await CaseworkerApiSteps.MediationUnsuccessful();
      await LegalAdvisorApiSteps.SdoSmallNoSum();
      await ClaimantCitizenApiSteps.RequestForReconsideration();
      await JudgeApiSteps.DecisionOnReconsiderationRequestSdo();
    });
  },
);
