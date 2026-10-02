import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v2DS spec discontinue claim',
  { tag: ['@civil-ccd-nightly', '@ui-discontinue-claim'] },
  () => {
    test('1v2DS spec discontinue this claim - full discontinuance', async ({
      ClaimantSolicitorSpecSteps,
      ClaimantSolicitorSpecApiSteps,
      DefendantSolicitor1SpecApiSteps,
      DefendantSolicitor2SpecApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmall1v2DS();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.SMALL_CLAIM,
        claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      });
      await DefendantSolicitor2SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.SMALL_CLAIM,
        claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      });
      await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence1v2DS();
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.DiscontinueClaim1v2DS();
    });
  },
);
