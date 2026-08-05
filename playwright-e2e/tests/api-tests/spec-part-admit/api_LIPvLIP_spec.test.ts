import { test } from '../../../playwright-fixtures/index';

test.describe(
  'LIP v LIP spec part admit api journeys',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v1 LiP v LiP Part admit defendant and claimant response - claimant rejects installment plan - CARM enabled', async ({
      ClaimantCitizenApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantCitizenApiSteps.CreateLipClaimSmall();
      await ClaimantCitizenApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
    });
  },
);
