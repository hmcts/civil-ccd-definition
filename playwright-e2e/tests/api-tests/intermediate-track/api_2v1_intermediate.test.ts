import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '2v1 unspec intermediate track api journey',
  {
    tag: ['@civil-service-nightly', '@api-intermediate-track'],
  },
  async () => {
    test('2v1 Create Unspecified Inter Track claim', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      JudgeApiSteps,
      HearingCenterAdminApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimInter2v1();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
        claimType: ClaimType.TWO_VS_ONE,
      });
      await ClaimantSolicitorApiSteps.RespondInterProceed2v1();
      await JudgeApiSteps.GenerateDirectionsOrderInter();
      await DefendantSolicitor1ApiSteps.EvidenceUploadFast();
      await HearingCenterAdminApiSteps.ScheduleHearingFastTrial();
    });
  },
);
