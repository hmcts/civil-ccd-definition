import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v2DS unspec notice of change api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1vDS spec notice of change', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      OtherDefendantSolicitor1ApiSteps,
      OtherDefendantSolicitor2ApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaim({
        claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
        claimTrack: ClaimTrack.FAST_CLAIM,
      });
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await OtherDefendantSolicitor1ApiSteps.NoticeOfChangeD1();
      await OtherDefendantSolicitor2ApiSteps.NoticeOfChangeD2();
    });
  },
);
