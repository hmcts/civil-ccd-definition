import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 create fast track claim with type housing disrepair',
 
  () => {
    test('1v1 create fast track claim with type housing disrepair', async ({
      ClaimantSolicitorSteps,
      DefendantSolicitor1ApiSteps,
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      JudgeSteps,
    }) => {
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.CreateClaimFastHousingDisrepair();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.RespondFastFullDefence();
      await ClaimantSolicitorApiSteps.RespondFastProceed();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.SdoFastOtherRemedy();
    });
  },
);
