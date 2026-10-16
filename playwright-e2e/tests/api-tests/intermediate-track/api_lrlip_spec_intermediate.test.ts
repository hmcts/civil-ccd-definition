import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v1 LIP v LIP and LR v LIP spec api journeys',
  { tag: '@civil-service-nightly' },
  async () => {
    test.fail(
      '1v1 LR v LiP intermediate track',
      async ({
        ClaimantSolicitorSpecApiSteps,
        DefendantCitizenApiSteps,
        CaseRoleAssignmentApiSteps,
      }) => {
        await ClaimantSolicitorSpecApiSteps.CreateClaim({
          claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
          claimType: ClaimType.ONE_VS_ONE_LIP,
        });
        await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
        await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
        await DefendantCitizenApiSteps.RespondInterFullDefence();
        await ClaimantSolicitorSpecApiSteps.RespondInterRejectFullDefence();
      },
    );
  },
);
