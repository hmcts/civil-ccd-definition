import { test } from '../../../playwright-fixtures/index';

test.describe('2v1 query management api journey',  async () => {
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
    await DefendantSolicitor1ApiSteps.RespondFastFullDefence2v1();
    await ClaimantSolicitorApiSteps.RespondFastProceed2v1();
    await ClaimantSolicitorApiSteps.RaiseLRHearingQuery();
    await CtscAdminApiSteps.RespondToHearingQuery();
    await ClaimantSolicitorApiSteps.FollowUpOnLRQuery();
    await DefendantSolicitor1ApiSteps.RaiseLRHearingQuery();
    await CtscAdminApiSteps.RespondToHearingQuery();
    await DefendantSolicitor1ApiSteps.FollowUpOnLRQuery();
  });
});
