import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v2SS spec intermediate track api journey',
  {
    tag: ['@civil-service-nightly', '@api-intermediate-track', '@civil-wa-master', '@civil-wa-pr'],
  },
  async () => {
    test('1v2SS spec full defence intermediate claim', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimInter1v2SS();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
        claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      });
      await ClaimantSolicitorSpecApiSteps.RespondInterRejectFullDefence();
    });
  },
);
