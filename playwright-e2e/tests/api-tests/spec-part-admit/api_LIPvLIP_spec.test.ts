import { test } from '../../../playwright-fixtures/index';

test.describe(
  'LIP v LIP spec part admit api journeys',
  { tag: '@civil-service-nightly' },
  async () => {
    test.fail('1v1 LiP v LiP Part admit defendant and claimant response - claimant rejects installment plan', async ({
      ClaimantCitizenApiSteps,
      DefendantCitizenApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantCitizenApiSteps.CreateLipClaimSmall();
      await ClaimantCitizenApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
      await DefendantCitizenApiSteps.RespondSmallPartAdmitRepayment();
      await ClaimantCitizenApiSteps.RespondSmallRejectPartAdmit();
    });
  },
);
