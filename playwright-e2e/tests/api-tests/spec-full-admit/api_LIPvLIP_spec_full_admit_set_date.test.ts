import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 LIP v LIP spec api full admit journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v1 LiP v LiP defendant response with full admit pay by set date', async ({
      ClaimantCitizenApiSteps,
      DefendantCitizenApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantCitizenApiSteps.CreateLipClaimSmall();
      await ClaimantCitizenApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
      await DefendantCitizenApiSteps.RespondSmallFullAdmitSetDate();
      await ClaimantCitizenApiSteps.RespondSmallAcceptFullAdmitSetDateCCJ();
    });
  },
);
