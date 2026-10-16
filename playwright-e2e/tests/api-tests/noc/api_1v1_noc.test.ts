import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe(
  '1v1 unspec notice of change api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v1 unspec notice of change', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      OtherClaimantSolicitor1ApiSteps,
      OtherDefendantSolicitor1ApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaim({ claimTrack: ClaimTrack.FAST_CLAIM });
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await OtherClaimantSolicitor1ApiSteps.NoticeOfChangeC1();
      await OtherDefendantSolicitor1ApiSteps.NoticeOfChangeD1();
    });
  },
);
