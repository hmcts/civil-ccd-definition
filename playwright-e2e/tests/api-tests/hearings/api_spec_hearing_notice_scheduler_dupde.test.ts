import { test } from '../../../playwright-fixtures/index';

test.describe('Spec automated hearing notice scheduler - duplicate detection', async () => {
  test('Create Spec claim with SDO', async ({
    HearingsApiSteps,
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecApiSteps,
    JudgeApiSteps,
    CaseworkerApiSteps
  }) => {
    await HearingsApiSteps.SetupStaticMocks();
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmall1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecApiSteps.RespondSmallFullDefence();
    await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence();
    await CaseworkerApiSteps.MediationUnsuccessful();
    await JudgeApiSteps.SdoSmallSum();
    await HearingsApiSteps.GenerateSingleHmcResponseHearingNoticeSpec();
    await HearingsApiSteps.SkipCurrentVersionNotifiedHearingNoticeSpec();
    await HearingsApiSteps.GenerateCurrentVersionMultiHmcResponsesHearingNoticeSpec();
    await HearingsApiSteps.GenerateRelistedVersionHearingNoticeSpec();
    await HearingsApiSteps.AcknowledgeUnchangedHearingWithoutNoticeSpec();
    await HearingsApiSteps.AvoidDuplicateNoticeWithoutGeneratingNoticeSpec();
    await HearingsApiSteps.GeneratePartialHmcResponseHearingNoticeSpec();
  });
});
