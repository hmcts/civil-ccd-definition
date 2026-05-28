import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 spec defence received in time judgment set aside @debug',
  { tag: '@civil-ccd-nightly' },
  () => {
    test('1v1 spec default judgment then refer to judge defended claim and make an order', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      ClaimantSolicitorSpecSteps,
      HearingCenterAdminSpecSteps,
      JudgeSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmallTrack1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorSpecApiSteps.AmendRespondent1ResponseDeadline();

      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.RequestDefaultJudgment();

      await HearingCenterAdminSpecSteps.LoginRegion2();
      await HearingCenterAdminSpecSteps.RequestReferToJudgeDefendedClaim();

      // await JudgeSteps.LoginRegion2();
      // await JudgeSteps.GenerateDirectionsOrder();
    });
  },
);
