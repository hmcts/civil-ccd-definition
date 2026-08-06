import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 LIP v LIP and LR v LIP spec api journeys',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v1 LiP v LiP Case Progression Journey', async ({
      ClaimantCitizenApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantCitizenApiSteps.CreateLipClaimFast();
      await ClaimantCitizenApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
    });
  },
);
