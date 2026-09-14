import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '2v1 query management api journey',
  { tag: ['@civil-service-nightly', '@api-qm'] },
  async () => {
    test('2v1 defendant and claimant response', async ({
      ClaimantSolicitorApiSteps,
      CtscAdminApiSteps,
      DefendantSolicitor1ApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimFast2v1();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.FAST_CLAIM,
        claimType: ClaimType.TWO_VS_ONE,
      });
      await ClaimantSolicitorApiSteps.RespondFastProceed2v1();
      await ClaimantSolicitorApiSteps.RaiseLRHearingQuery();
      await CtscAdminApiSteps.RespondToHearingQuery();
      await ClaimantSolicitorApiSteps.FollowUpOnLRQuery();
      await DefendantSolicitor1ApiSteps.RaiseLRHearingQuery();
      await CtscAdminApiSteps.RespondToHearingQuery();
      await DefendantSolicitor1ApiSteps.FollowUpOnLRQuery();
    });
  },
);
