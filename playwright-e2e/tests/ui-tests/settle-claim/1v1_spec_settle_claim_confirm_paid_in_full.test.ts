import { test } from '../../../playwright-fixtures';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe(
  '1v1 spec settle claim confirm paid in full',
  { tag: ['@civil-ccd-nightly', '@ui-settle-claim'] },
  () => {
    test('1v1 spec - settle claim - confirm paid in full', async ({
      ClaimantSolicitorSpecApiSteps,
      DefendantSolicitor1SpecApiSteps,
      CaseRoleAssignmentApiSteps,
      CaseworkerApiSteps,
      LegalAdvisorApiSteps,
      ClaimantSolicitorSpecSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmall1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.SMALL_CLAIM,
      });
      await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence();
      await CaseworkerApiSteps.MediationUnsuccessful();
      await LegalAdvisorApiSteps.SdoSmallNoSum();
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.SettleClaimMarkPaidInFull();
    });
  },
);
