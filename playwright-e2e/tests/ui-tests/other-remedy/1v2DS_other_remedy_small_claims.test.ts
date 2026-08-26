import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v2DS create small claim with type housing disrepair',
 
  () => {
    test('1v2DS create small claim with type housing disrepair', async ({
      ClaimantSolicitorSteps,
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1Steps,
      DefendantSolicitor2Steps,
      JudgeSteps,
    }) => {
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.CreateClaimSmallHousingDisrepair1v2DS();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1Steps.Login();
      await DefendantSolicitor1Steps.RespondSmallFullDefence1v2DS();
      await DefendantSolicitor2Steps.Login();
      await DefendantSolicitor2Steps.RespondSmallFullDefence1v2DS();
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.RespondSmallProceed1v2DS();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.SdoSmallNoSumOtherRemedy();
    });
  },
);
