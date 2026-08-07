import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 LIP v LIP and LR v LIP spec api journeys',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v1 LiP v LiP defendant and claimant response', async ({
      ClaimantCitizenApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantCitizenApiSteps.CreateLipClaimIntermediate();
      await ClaimantCitizenApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
    });
  },
);
