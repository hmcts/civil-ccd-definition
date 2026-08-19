import { test } from '../../../playwright-fixtures/index';

test.describe('2v1 query management api journey', { tag: '@civil-service-nightly' }, async () => {
  test('2v1 defendant and claimant response', async ({
    ClaimantSolicitorApiSteps,
    CaseworkerApiSteps,
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
    await CaseworkerApiSteps.RespondToHearingQuery();
    await ClaimantSolicitorApiSteps.FollowUpOnLRQuery();
    await DefendantSolicitor1ApiSteps.RaiseLRHearingQuery();
    await CaseworkerApiSteps.RespondToHearingQuery();
    await DefendantSolicitor1ApiSteps.FollowUpOnLRQuery();
  });
});
