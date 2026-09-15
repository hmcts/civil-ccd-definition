import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v2SS spec api small track journeys',
  { tag: ['@civil-service-nightly', '@api-spec-full-defence'] },
  async () => {
    test(
      '1v2SS small claim full defence and claimant response',
      { tag: ['@civil-service-master', '@civil-service-pr'] },
      async ({
        ClaimantSolicitorSpecApiSteps,
        CaseRoleAssignmentApiSteps,
        DefendantSolicitor1SpecApiSteps,
      }) => {
        await ClaimantSolicitorSpecApiSteps.CreateClaimSmall1v2SS();
        await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
        await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
        await DefendantSolicitor1SpecApiSteps.DefendantResponse({
          claimTrack: ClaimTrack.SMALL_CLAIM,
          claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
        });
        await ClaimantSolicitorSpecApiSteps.RespondFastRejectFullDefence1v2SS();
      },
    );
  },
);
