import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe('1v1 - Manage Contact Information', { tag: '@ui-mci' }, async () => {
  test('1v1 - Manage Contact Information', async ({
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1ApiSteps,
    CaseworkerSteps,
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaimFast1v1();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.NotifyClaim();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails();
    await DefendantSolicitor1ApiSteps.AddLitigationFriend();
    await DefendantSolicitor1ApiSteps.DefendantResponse({ claimTrack: ClaimTrack.FAST_CLAIM });
    await ClaimantSolicitorApiSteps.RespondFastProceed();
    await CaseworkerSteps.Login();
    await CaseworkerSteps.ManageContactInformation();
  });
});
