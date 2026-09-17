import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimTypeUnspec from '../../../constants/ccd-events/ccd-events/create-claim/claim-type-unspec';

test.describe(
  '1v1 unspec api journey for Small Other Remedy claim',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v1 unspec small other remedy', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaim({
        claimTrack: ClaimTrack.SMALL_CLAIM,
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
