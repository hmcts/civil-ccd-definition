import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 create fast track claim with type housing disrepair',
  { tag: '@civil-ccd-nightly' },
  () => {
    test('1v1 create fast track claim with type housing disrepair', async ({
      ClaimantSolicitorSteps,
      DefendantSolicitor1Steps,
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      JudgeSteps,
    }) => {
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.CreateClaimFastHousingDisrepair1v1();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorSteps.NotifyClaimDetails();
      await DefendantSolicitor1Steps.Login();
      await DefendantSolicitor1Steps.RespondFastFullDefence1v1();
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.RespondFastProceed1v1();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.SdoFastOtherRemedy();
    });
  },
);
