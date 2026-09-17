import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v1 LR v LiP multi track api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test.fail(
      '1v1 LR v LiP multi track',
      async ({
        ClaimantSolicitorSpecApiSteps,
        DefendantCitizenApiSteps,
        CaseRoleAssignmentApiSteps,
      }) => {
        await ClaimantSolicitorSpecApiSteps.CreateClaim({
          claimTrack: ClaimTrack.MULTI_CLAIM,
          claimType: ClaimType.ONE_VS_ONE_LIP,
        });
        await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
        await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
        await DefendantCitizenApiSteps.RespondMultiFullDefence();
        await ClaimantSolicitorSpecApiSteps.RespondMultiRejectFullDefence();
      },
    );
  },
);
