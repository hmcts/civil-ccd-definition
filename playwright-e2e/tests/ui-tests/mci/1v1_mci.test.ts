import { test } from '../../../playwright-fixtures/index';

test.describe('1v1 - Manage Contact Information', async () => {
  test('1v1 - Manage Contact Information @debug', async ({
    ClaimantSolicitorApiSteps, 
    CaseRoleAssignmentApiSteps, 
    DefendantSolicitor1ApiSteps,
    CaseworkerSteps,
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaimFastTrack1v1();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.NotifyClaim();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails();
    await DefendantSolicitor1ApiSteps.AddLitigationFriend();
    await DefendantSolicitor1ApiSteps.RespondFastTrackFullDefence();
    await ClaimantSolicitorApiSteps.RespondFastTrackFullDefence();
    await CaseworkerSteps.Login();
    await CaseworkerSteps.ManageContactInformation()
  });
})