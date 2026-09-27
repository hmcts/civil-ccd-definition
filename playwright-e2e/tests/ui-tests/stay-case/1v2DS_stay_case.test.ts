import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe('1v2DS stay case journey', { tag: ['@civil-ccd-nightly', '@ui-stay-case'] }, () => {
  test('1v2DS stay case journey', async ({
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1ApiSteps,
    DefendantSolicitor2ApiSteps,
    DefendantSolicitor2Steps,
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
    await DefendantSolicitor1ApiSteps.RespondFastFullDefence();
    await DefendantSolicitor2ApiSteps.RespondFastFullDefence();
    await ClaimantSolicitorApiSteps.RespondFastProceed1v2DS();
    await DefendantSolicitor2Steps.Login();
    await DefendantSolicitor2Steps.AddUnavailableDates();
    await HearingCenterAdminSteps.LoginRegion1();
    await HearingCenterAdminSteps.StayCase();
    await HearingCenterAdminSteps.ManageStayRequestUpdate();
    await HearingCenterAdminSteps.ManageStayLiftStay();
  });
});
