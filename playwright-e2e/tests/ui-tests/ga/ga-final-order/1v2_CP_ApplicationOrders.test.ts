import { test } from '../../../../playwright-fixtures';

test.describe(
  'Before SDO 1v2 - GA CP - Applications Orders',
  { tag: ['@civil-ccd-nightly'] },
  () => {
    test('1v2 - Assisted order - With Further Hearing', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      DefendantSolicitor2ApiSteps,
      ClaimantSolicitorGaApiSteps,
      JudgeGaApiSteps,
      HearingCenterAdminGaApiSteps,
      JudgeGaSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimFast1v2DS();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.RespondFastFullDefence1v2DS();
      await DefendantSolicitor2ApiSteps.RespondFastFullDefence();
      await ClaimantSolicitorApiSteps.RespondFastProceed1v2DS();
      await ClaimantSolicitorApiSteps.InitiateGA();
      await ClaimantSolicitorGaApiSteps.MakePaymentForClaimIssued();
      await JudgeGaApiSteps.MakeADecisionListHearing();
      await HearingCenterAdminGaApiSteps.HearingScheduledGa();
      await JudgeGaSteps.Login();
      await JudgeGaSteps.MakeAssistedOrderWithoutNotice();
    });
  },
);
