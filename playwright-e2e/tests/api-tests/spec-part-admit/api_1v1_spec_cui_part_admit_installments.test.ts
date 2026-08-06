import { test } from '../../../playwright-fixtures/index';

test.describe(
  'LIP v LIP spec api part admit journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('LiP v LiP defendant response with part admit pay by installments', async ({
      ClaimantCitizenApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantCitizenApiSteps.CreateLipClaimSmall();
      await ClaimantCitizenApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
    });
  },
);
