import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '2v1 unspec multi track journey',
  {
    tag: [
      '@civil-service-nightly',
      '@api-multi-track',
      '@civil-service-master',
      '@civil-service-pr',
    ],
  },
  async () => {
    test('2v1 unspec multi track claim', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      JudgeApiSteps,
      HearingCenterAdminApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimMulti2v1();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.MULTI_CLAIM,
        claimType: ClaimType.TWO_VS_ONE,
      });
      await ClaimantSolicitorApiSteps.RespondMultiProceed2v1();
      await JudgeApiSteps.GenerateDirectionsOrderMulti();
      await ClaimantSolicitorApiSteps.EvidenceUploadFast2v1();
      await HearingCenterAdminApiSteps.ScheduleHearingFastTrial();
    });
  },
);
