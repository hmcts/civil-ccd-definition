import { test } from '../../../../playwright-fixtures';

test.describe(
  'After SDO 1v2 - GA CP - Hearing Notice document',
  
  () => {
    test.fail(
      'Claimant Hearing notice - Without notice journey',
      async ({
        ClaimantSolicitorApiSteps,
        CaseRoleAssignmentApiSteps,
        DefendantSolicitor1ApiSteps,
        DefendantSolicitor2ApiSteps,
        ClaimantSolicitorGaApiSteps,
        JudgeGaApiSteps,
        HearingCenterAdminGaSteps,
      }) => {
        await ClaimantSolicitorApiSteps.CreateClaimFast1v2DS();
        await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
        await ClaimantSolicitorApiSteps.NotifyClaim();
        await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
        await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
        await ClaimantSolicitorApiSteps.NotifyClaimDetails();
        await DefendantSolicitor1ApiSteps.RespondFastFullDefence();
        await DefendantSolicitor2ApiSteps.RespondFastFullDefence();
        await ClaimantSolicitorApiSteps.RespondFastProceed1v2DS();
        await DefendantSolicitor2ApiSteps.InitiateGA();
        await ClaimantSolicitorGaApiSteps.MakePaymentForClaimIssued();
        await JudgeGaApiSteps.MakeADecisionListHearing();
        await HearingCenterAdminGaSteps.Login();
        await HearingCenterAdminGaSteps.HearingScheduledGa();
      },
    );
  },
);
