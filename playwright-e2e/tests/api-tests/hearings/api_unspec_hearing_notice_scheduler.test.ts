import { test } from '../../../playwright-fixtures/index';

test.describe('Unspec automated hearing notice schedulers', async () => {
  test('Prepare unspec claim up to SDO', async ({
    HearingsApiSteps,
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1ApiSteps,
    JudgeApiSteps,
  }) => {
    await HearingsApiSteps.SetupStaticMocks();
    await ClaimantSolicitorApiSteps.CreateClaimFast1v1();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.AmendClaimDocuments();
    await ClaimantSolicitorApiSteps.NotifyClaim();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails();
    await DefendantSolicitor1ApiSteps.AddLitigationFriend();
    await DefendantSolicitor1ApiSteps.RespondFastFullDefence();
    await ClaimantSolicitorApiSteps.RespondFastProceed();
    await JudgeApiSteps.SdoFast();
    await HearingsApiSteps.GenerateDisposalHearingNotice();
    await HearingsApiSteps.GenerateTrailHearingNotice();
    await HearingsApiSteps.GenerateDRHearingNotice();
  });
});
