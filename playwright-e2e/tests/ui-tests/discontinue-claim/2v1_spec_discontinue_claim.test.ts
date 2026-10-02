import { test } from '../../../playwright-fixtures/index';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '2v1 spec discontinue claim',
  { tag: ['@civil-ccd-nightly', '@ui-discontinue-claim'] },
  () => {
    test('2v1 spec discontinue this claim - full discontinuance', async ({
      ClaimantSolicitorSpecSteps,
      ClaimantSolicitorSpecApiSteps,
      DefendantSolicitor1SpecSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({ claimType: ClaimType.TWO_VS_ONE });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecSteps.Login();
      await DefendantSolicitor1SpecSteps.RespondSmallFullDefence2v1();
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.RespondSmallProceed2v1();
      await ClaimantSolicitorSpecSteps.DiscontinueClaim2v1();
    });
  },
);
