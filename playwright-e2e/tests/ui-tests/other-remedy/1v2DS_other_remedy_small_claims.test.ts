import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v2DS create small claim with type housing disrepair',
  { tag: '@civil-ccd-nightly' },
  () => {
    test('1v2DS create small claim with type housing disrepair', async ({
      ClaimantSolicitorSteps,
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      DefendantSolicitor2ApiSteps,
      JudgeSteps,
    }) => {
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.CreateClaimSmallHousingDisrepair1v2DS();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.RespondSmallFullDefence();
      await DefendantSolicitor2ApiSteps.RespondSmallFullDefence();
      await ClaimantSolicitorApiSteps.RespondSmallProceed1v2DS();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.SdoSmallNoSumOtherRemedy();
    });
  },
);
