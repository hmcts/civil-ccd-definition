import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v2 discontinue claim spec api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v2 discontinue claim spec', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      CaseworkerApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({
        claimTrack: ClaimTrack.FAST_CLAIM,
        claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await ClaimantSolicitorSpecApiSteps.DiscontinueClaimFull1v2();
      await CaseworkerApiSteps.ValidateDiscontinueClaimYes();
    });

    test('1v2 discontinue claim spec negative', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      CaseworkerApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({
        claimTrack: ClaimTrack.FAST_CLAIM,
        claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorSpecApiSteps.DiscontinueClaimFull1v2();
      await CaseworkerApiSteps.ValidateDiscontinueClaimNo();
    });
  },
);
