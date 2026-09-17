import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v2SS spec notice of change api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1vSS spec notice of change', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      DefendantSolicitor2SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({
        claimTrack: ClaimTrack.FAST_CLAIM,
        claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor2SpecApiSteps.NoticeOfChange();
      await DefendantSolicitor1SpecApiSteps.RespondFastFullDefence();
      await DefendantSolicitor2SpecApiSteps.RespondFastFullDefence();
    });
  },
);
