import { test } from '../../../playwright-fixtures/index';

test.describe(
  'LIPvLIP spec request for reconsideration api journeys',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v1 LiP v LiP Request for reconsideration', async ({
      ClaimantCitizenApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantCitizenApiSteps.CreateLipClaimSmall();
      await ClaimantCitizenApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
    });
  },
);
