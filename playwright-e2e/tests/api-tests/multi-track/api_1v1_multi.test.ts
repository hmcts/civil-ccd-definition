import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe(
  '1v1 unspec multi track journey',
  {
    tag: [
      '@civil-service-nightly',
      '@api-multi-track',
      '@civil-service-master',
      '@civil-service-pr',
    ],
  },
  async () => {
    test('1v1 unspec multi track', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      JudgeApiSteps,
      HearingCenterAdminApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimMulti1v1();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.MULTI_CLAIM,
      });
      await ClaimantSolicitorApiSteps.RespondMultiProceed();
      await JudgeApiSteps.GenerateDirectionsOrderMulti();
      await ClaimantSolicitorApiSteps.EvidenceUploadFast();
      await HearingCenterAdminApiSteps.ScheduleHearingFastTrial();
    });
  },
);
