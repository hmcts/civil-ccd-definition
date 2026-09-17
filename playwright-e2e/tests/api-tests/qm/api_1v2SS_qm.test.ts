import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v2 same solicitor query management api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v2SS defendant and claimant response', async ({
      ClaimantSolicitorApiSteps,
      CtscAdminApiSteps,
      DefendantSolicitor1ApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaim({
        claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
        claimTrack: ClaimTrack.FAST_CLAIM,
      });
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.RespondFastFullDefence1v2SS();
      await ClaimantSolicitorApiSteps.RespondFastProceed1v2SS();
      await ClaimantSolicitorApiSteps.RaiseLRQuery();
      await CtscAdminApiSteps.RespondToQuery();
      await ClaimantSolicitorApiSteps.FollowUpOnLRQuery();
      await DefendantSolicitor1ApiSteps.RaiseLRHearingQuery();
      await CtscAdminApiSteps.RespondToHearingQuery();
      await DefendantSolicitor1ApiSteps.FollowUpOnLRQuery();
    });
  },
);
