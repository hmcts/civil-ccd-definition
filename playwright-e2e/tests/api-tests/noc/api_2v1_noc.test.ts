import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '2v1 unspec notice of change api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('2v1 unspec notice of change', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      OtherClaimantSolicitor1ApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaim({
        claimType: ClaimType.TWO_VS_ONE,
        claimTrack: ClaimTrack.FAST_CLAIM,
      });
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await OtherClaimantSolicitor1ApiSteps.NoticeOfChangeC1();
    });
  },
);
