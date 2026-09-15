import { test } from '../../../playwright-fixtures/index';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v2SS spec api fast track journeys',
  { tag: ['@civil-service-nightly', '@api-spec-full-defence'] },
  async () => {
    test('1v2SS full defence and claimant response', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v2SS();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      });
      await ClaimantSolicitorSpecApiSteps.RespondFastRejectFullDefence1v2SS();
    });

    test('1v2SS fast claim full defence and not proceed', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v2SS();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      });
      await ClaimantSolicitorSpecApiSteps.RespondFastAcceptFullDefence1v2SS();
    });
  },
);
