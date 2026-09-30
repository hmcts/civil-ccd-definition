import { test } from '../../../playwright-fixtures';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '2v1 spec settle claim confirm paid in full',
  { tag: ['@civil-ccd-nightly', '@ui-settle-claim'] },
  () => {
    test('2v1 spec - settle claim - confirm paid in full', async ({
      ClaimantSolicitorSpecApiSteps,
      DefendantSolicitor1SpecApiSteps,
      CaseRoleAssignmentApiSteps,
      CaseworkerApiSteps,
      LegalAdvisorApiSteps,
      ClaimantSolicitorSpecSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmall2v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.SMALL_CLAIM,
        claimType: ClaimType.TWO_VS_ONE,
      });
      await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence2v1();
      await CaseworkerApiSteps.MediationUnsuccessful();
      await LegalAdvisorApiSteps.SdoSmallNoSum();
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.SettleClaimMarkPaidInFull2v1();
    });
  },
);
