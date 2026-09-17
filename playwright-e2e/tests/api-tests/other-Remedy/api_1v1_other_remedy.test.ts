import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimTypeUnspec from '../../../constants/ccd-events/ccd-events/create-claim/claim-type-unspec';

test.describe(
  '1v1 unspec full defence api journey for Other Remedy claim type fast track',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v1 unspec fast other remedy', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaim({
        claimTrack: ClaimTrack.FAST_CLAIM,
        claimTypeUnspec: ClaimTypeUnspec.HOUSING_DISREPAIR,
      });
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1ApiSteps.RespondFastFullDefence();
      await ClaimantSolicitorApiSteps.RespondFastProceed();
    });
  },
);
