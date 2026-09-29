import { test } from '../../../playwright-fixtures';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v2DS spec settle claim consent order',
  { tag: ['@civil-ccd-nightly', '@ui-settle-claim'] },
  () => {
    test('1v2DS spec - settle claim - reason for settlement - consent order', async ({
      ClaimantSolicitorSpecApiSteps,
      DefendantSolicitor1SpecApiSteps,
      DefendantSolicitor2SpecApiSteps,
      CaseRoleAssignmentApiSteps,
      CaseworkerApiSteps,
      LegalAdvisorApiSteps,
      HearingCenterAdminSpecSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmall1v2DS();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.SMALL_CLAIM,
        claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      });
      await DefendantSolicitor2SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.SMALL_CLAIM,
        claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      });
      await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence1v2DS();
      await CaseworkerApiSteps.MediationUnsuccessful();
      await LegalAdvisorApiSteps.SdoSmallNoSum();
      await HearingCenterAdminSpecSteps.LoginRegion1();
      await HearingCenterAdminSpecSteps.SettleClaimConsentOrder();
    });
  },
);
