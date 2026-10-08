import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v2SS unspec notice of change api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('notice of change - 1v2 - same solicitor to diff solicitor', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor2ApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaim({
        claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
        claimTrack: ClaimTrack.FAST_CLAIM,
      });
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor2ApiSteps.NoticeOfChange();
    });
  },
);
