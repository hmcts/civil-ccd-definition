import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from "../../../constants/cases/claim-type.ts";

test.describe(
  '1v2DS fast track with hearing request',
  {
    tag: ['@civil-ccd-nightly', '@ui-hearings'],
  },
  () => {
    test('1v2DS create fast track with hearing request', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      DefendantSolicitor2ApiSteps,
      JudgeApiSteps,
      HearingCenterAdminSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaim({
        claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
        claimTrack: ClaimTrack.FAST_CLAIM,
      });
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.DefendantResponse({ claimTrack: ClaimTrack.FAST_CLAIM });
      await DefendantSolicitor2ApiSteps.DefendantResponse({ claimTrack: ClaimTrack.FAST_CLAIM });
      await ClaimantSolicitorApiSteps.RespondFastProceed1v2DS();
      await JudgeApiSteps.SdoFast();
      await HearingCenterAdminSteps.LoginRegion1();
      await HearingCenterAdminSteps.RequestNewHearing();
      await HearingCenterAdminSteps.UpdateHearing();
      await HearingCenterAdminSteps.CancelHearing();
    });
  },
);
