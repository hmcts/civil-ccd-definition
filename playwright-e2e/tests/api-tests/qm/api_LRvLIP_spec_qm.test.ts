import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  'LR v LIP query management spec api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('LR v LIP query management spec', async ({
      ClaimantSolicitorSpecApiSteps,
      DefendantCitizenApiSteps,
      CaseRoleAssignmentApiSteps,
      JudgeApiSteps,
      CtscAdminApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({
        claimTrack: ClaimTrack.FAST_CLAIM,
        claimType: ClaimType.ONE_VS_ONE_LIP,
      });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
      await DefendantCitizenApiSteps.RespondFastFullDefence();
      await ClaimantSolicitorSpecApiSteps.RespondFastRejectFullDefence();
      await JudgeApiSteps.SdoFast();
      await ClaimantSolicitorSpecApiSteps.RaiseLRHearingQuery();
      await CtscAdminApiSteps.RespondToHearingQuery();
      await ClaimantSolicitorSpecApiSteps.FollowUpOnLRQuery();
      await DefendantCitizenApiSteps.RaiseLipQuery();
      await CtscAdminApiSteps.RespondToQuery();
      await DefendantCitizenApiSteps.FollowUpOnLipQuery();
    });
  },
);
