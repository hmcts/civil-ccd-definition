import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v2DS spec stay case journey',
  { tag: ['@civil-ccd-nightly', '@ui-stay-case'] },
  async () => {
    test('1v2DS spec stay case journey', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      DefendantSolicitor2SpecSteps,
      HearingCenterAdminSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmall1v2DS();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.SMALL_CLAIM,
        claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      });
      await DefendantSolicitor2SpecSteps.Login();
      await DefendantSolicitor2SpecSteps.RespondSmallFullDefence1v2DS();
      await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence1v2DS();
      await HearingCenterAdminSteps.LoginRegion1();
      await HearingCenterAdminSteps.StayCase();
      await HearingCenterAdminSteps.ManageStayRequestUpdate();
      await HearingCenterAdminSteps.ManageStayLiftStay();
    });
  },
);
