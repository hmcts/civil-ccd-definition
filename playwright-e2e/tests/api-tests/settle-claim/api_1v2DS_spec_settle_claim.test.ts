import { test } from '../../../playwright-fixtures/index';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v2 settle claim spec api journey',
  { tag: ['@civil-service-nightly', '@api-settle-claim'] },
  async () => {
    test('1v2 settle claim spec', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      DefendantSolicitor2SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v2DS();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      });
      await DefendantSolicitor2SpecApiSteps.DefendantResponse({
        claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      });
      await ClaimantSolicitorSpecApiSteps.RespondFastRejectFullDefence();
      await ClaimantSolicitorSpecApiSteps.SettleClaim();
    });
  },
);
