import { test } from '../../../playwright-fixtures';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe(
  '1v1 spec request for reconsideration > yes, uphold the previous order made',
  {
    tag: ['@civil-ccd-nightly', '@ui-rfr'],
  },
  () => {
    test('1v1 spec request for reconsideration > yes, uphold the previous order made', async ({
      ClaimantSolicitorSpecApiSteps,
      DefendantSolicitor1SpecApiSteps,
      CaseRoleAssignmentApiSteps,
      CaseworkerApiSteps,
      LegalAdvisorApiSteps,
      ClaimantSolicitorSpecSteps,
      JudgeSteps,
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
      await ClaimantSolicitorSpecSteps.RequestForReconsideration();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.DecisionOnReconsiderationRequestUpholdOrder();
    });
  },
);
