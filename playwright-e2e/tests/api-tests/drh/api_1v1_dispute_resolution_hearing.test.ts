import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 dispute resolution hearing api journey',
  { tag: ['@civil-service-nightly', '@api-drh', '@civil-wa-master', '@civil-wa-pr'] },
  async () => {
    test('1v1 full defence unspecified - judge draws small claims DRH - hearing scheduled', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      JudgeApiSteps,
      HearingCenterAdminApiSteps
    }) => {
      if(process.env.RUN_FAILING_FUNCTIONAL_TESTS === 'true') {
        throw new Error('This test is currently failing and is being skipped. Please check the test and fix it before enabling it again.');
      }
      await ClaimantSolicitorApiSteps.CreateClaimSmall1v1();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.AmendClaimDocuments();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.RespondSmallFullDefence();
      await ClaimantSolicitorApiSteps.RespondSmallProceed();
      await JudgeApiSteps.SdoSmallSumDRH();
      await ClaimantSolicitorApiSteps.EvidenceUploadSmall();
      await DefendantSolicitor1ApiSteps.EvidenceUploadFast();
      await HearingCenterAdminApiSteps.ScheduleHearingSmallTrailWA();
      await HearingCenterAdminApiSteps.AmendHearingDueDate();
      await ClaimantSolicitorApiSteps.MakePaymentForHearingFee();
      await JudgeApiSteps.GenerateDirectionsOrderFreeForm();
    });
  },
);
