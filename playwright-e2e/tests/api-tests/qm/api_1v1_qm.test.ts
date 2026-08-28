import { test } from '../../../playwright-fixtures/index';

test.describe('1v1 query management api journey',  async () => {
  test('1v1 defendant and claimant response', async ({
    ClaimantSolicitorApiSteps,
    DefendantSolicitor1ApiSteps,
    CaseRoleAssignmentApiSteps,
    CtscAdminApiSteps,
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaimFast1v1();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.NotifyClaim();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails();
    await DefendantSolicitor1ApiSteps.RespondFastFullDefence();
    await ClaimantSolicitorApiSteps.RespondFastProceed();
    await ClaimantSolicitorApiSteps.RaiseLRHearingQuery();
    await CtscAdminApiSteps.RespondToHearingQuery();
    await ClaimantSolicitorApiSteps.FollowUpOnLRQuery();
    await DefendantSolicitor1ApiSteps.RaiseLRQuery();
    await CtscAdminApiSteps.RespondToQuery();
    await DefendantSolicitor1ApiSteps.FollowUpOnLRQuery();
  });
});
