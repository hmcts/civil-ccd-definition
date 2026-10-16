import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '2v1 spec notice of change api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('2v1 spec notice of change', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      OtherClaimantSolicitor1ApiSteps,
      OtherDefendantSolicitor1ApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({
        claimTrack: ClaimTrack.FAST_CLAIM,
        claimType: ClaimType.TWO_VS_ONE,
      });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await OtherClaimantSolicitor1ApiSteps.NoticeOfChangeC1();
      await OtherDefendantSolicitor1ApiSteps.NoticeOfChangeD1();
    });
  },
);
