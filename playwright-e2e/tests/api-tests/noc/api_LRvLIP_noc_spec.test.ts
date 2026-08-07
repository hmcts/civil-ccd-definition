import { test } from '../../../playwright-fixtures/index';

test.describe(
  'LR v LiP notice of change spec api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('LR v LiP notice of change', async ({
      ClaimantCitizenApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantCitizenApiSteps.CreateLipClaimSmall();
      await ClaimantCitizenApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
    });
  },
);
