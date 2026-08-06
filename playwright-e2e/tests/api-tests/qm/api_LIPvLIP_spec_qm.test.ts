import { test } from '../../../playwright-fixtures/index';

test.describe(
  'LR v LIP query management spec api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('LR v LIP query management spec', async ({
      ClaimantCitizenApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantCitizenApiSteps.CreateLipClaimFast();
      await ClaimantCitizenApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
    });
  },
);
