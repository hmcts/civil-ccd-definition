import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe(
  'Unspec automated hearing notice scheduler - duplicate detection',
  { tag: ['@api-hearings', '@civil-service-pr'] },
  async () => {
    test('Create Unspec claim with SDO', async ({
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
      await DefendantSolicitor1ApiSteps.DefendantResponse({ claimTrack: ClaimTrack.FAST_CLAIM });
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
  },
);
