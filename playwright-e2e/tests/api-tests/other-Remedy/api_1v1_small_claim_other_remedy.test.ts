import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe(
  '1v1 unspec api journey for Small Other Remedy claim',
  { tag: ['@civil-service-nightly', '@api-other-remedy'] },
  async () => {
    test('1v1 unspec small other remedy', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimSmallOtherRemedy1v1();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1ApiSteps.DefendantResponse({ claimTrack: ClaimTrack.SMALL_CLAIM });
      await ClaimantSolicitorApiSteps.RespondFastProceed();
    });
  },
);
