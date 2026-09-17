import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '2v1 spec fast full admit repayment api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('2v1 spec fast full admit repayment setup before defendant response', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({
        claimTrack: ClaimTrack.FAST_CLAIM,
        claimType: ClaimType.TWO_VS_ONE,
      });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.RespondFullAdmitRepayment2v1();
      // await ClaimantSolicitorSpecApiSteps.RespondFullAdmitRepayment();
    });
  },
);
