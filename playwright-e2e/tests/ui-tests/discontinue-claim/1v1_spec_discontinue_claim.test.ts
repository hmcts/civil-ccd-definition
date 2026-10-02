import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe(
  '1v1 spec discontinue claim',
  { tag: ['@civil-ccd-nightly', '@ui-discontinue-claim'] },
  () => {
    test('1v1 spec discontinue this claim - full discontinuance', async ({
      ClaimantSolicitorSpecSteps,
      ClaimantSolicitorSpecApiSteps,
      DefendantSolicitor1SpecApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmall1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.SMALL_CLAIM,
      });
      await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence();
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.DiscontinueClaim1v1();
    });
  },
);
