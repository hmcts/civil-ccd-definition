import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe(
  '1v1 unspec full defence api journey for Other Remedy claim type fast track',
  { tag: ['@civil-service-nightly', '@api-other-remedy'] },
  async () => {
    test('1v1 unspec fast other remedy', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimFastOtherRemedy1v1();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1ApiSteps.DefendantResponse({ claimTrack: ClaimTrack.FAST_CLAIM });
      await ClaimantSolicitorApiSteps.RespondFastProceed();
    });
  },
);
