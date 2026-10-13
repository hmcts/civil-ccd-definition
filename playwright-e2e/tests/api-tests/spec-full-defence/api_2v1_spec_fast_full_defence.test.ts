import { test } from '../../../playwright-fixtures/index';
import ClaimType from '../../../constants/cases/claim-type';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe(
  '2v1 spec full defence api journey',
  { tag: ['@civil-service-nightly', '@api-spec-full-defence'] },
  async () => {
    test('2v1 spec full defence', async ({
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
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.FAST_CLAIM,
        claimType: ClaimType.TWO_VS_ONE,
      });
      await ClaimantSolicitorSpecApiSteps.RespondFastRejectFullDefence2v1();
    });
  },
);
