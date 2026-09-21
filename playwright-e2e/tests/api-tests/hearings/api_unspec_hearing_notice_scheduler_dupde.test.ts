import { test } from '../../../playwright-fixtures/index';

test.describe('Unspec automated hearing notice scheduler - duplicate detection', { tag: ['@api-hearings', '@civil-service-pr'] }, async () => {
  test('Create Unspec claim with SDO', async ({
    HearingsApiSteps,
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1ApiSteps,
    JudgeApiSteps,
  }) => {
    if(process.env.RUN_FAILING_FUNCTIONAL_TESTS === 'true') {
      throw new Error('This test is currently failing and is being skipped. Please check the test and fix it before enabling it again.');
    }
    await HearingsApiSteps.SetupStaticMocks();
    await ClaimantSolicitorApiSteps.CreateClaimFast1v1();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.AmendClaimDocuments();
    await ClaimantSolicitorApiSteps.NotifyClaim();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails();
    await DefendantSolicitor1ApiSteps.RespondFastFullDefence();
    await ClaimantSolicitorApiSteps.RespondFastProceed();
    await JudgeApiSteps.SdoFast();
    await HearingsApiSteps.GenerateSingleHmcResponseHearingNotice();
    await HearingsApiSteps.SkipCurrentVersionNotifiedHearingNotice();
    await HearingsApiSteps.GenerateCurrentVersionMultiHmcResponsesHearingNotice();
    await HearingsApiSteps.GenerateRelistedVersionHearingNotice();
    await HearingsApiSteps.AcknowledgeUnchangedHearingWithoutNotice();
    await HearingsApiSteps.AvoidDuplicateNoticeWithoutGeneratingNotice();
    await HearingsApiSteps.GeneratePartialHmcResponseHearingNotice();
  });
});
