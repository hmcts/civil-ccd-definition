import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v2SS unspec intermediate track api journey',
  {
    tag: '@civil-service-nightly',
  },
  async () => {
    test('1v2 Same Solicitor Create Unspecified Inter Track claim', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      JudgeApiSteps,
      HearingCenterAdminApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaim({
        claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
        claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
      });
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.RespondInterFullDefence1v2SS();
      await ClaimantSolicitorApiSteps.RespondInterProceed1v2SS();
      await JudgeApiSteps.GenerateDirectionsOrderInter();
      await DefendantSolicitor1ApiSteps.EvidenceUploadFast1v2SS();
      await HearingCenterAdminApiSteps.ScheduleHearingFastTrial();
    });
  },
);
