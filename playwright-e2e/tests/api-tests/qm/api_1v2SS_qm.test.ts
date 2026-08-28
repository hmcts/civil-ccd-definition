import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v2 same solicitor query management api journey',
  
  async () => {
    test('1v2SS defendant and claimant response', async ({
      ClaimantSolicitorApiSteps,
      CtscAdminApiSteps,
      DefendantSolicitor1ApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimFast1v2SS();
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
