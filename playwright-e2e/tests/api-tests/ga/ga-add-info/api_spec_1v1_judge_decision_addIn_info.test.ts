import { test } from '../../../../playwright-fixtures';

test.describe('GA 1v1 Judge Make Decision Additional Information Required API tests', { tag: '@civil-service-nightly' }, () => {
  test.fail('Judge makes decision 1V1 - AWAITING_ADDITIONAL_INFORMATION', async ({
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1ApiSteps,
    ClaimantSolicitorGaApiSteps,
    DefendantSolicitor1GaApiSteps,
    JudgeGaApiSteps,
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaimFast1v1();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.NotifyClaim();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails();
    await DefendantSolicitor1ApiSteps.RespondFastFullDefence();
    await ClaimantSolicitorApiSteps.RespondFastProceed();
    await ClaimantSolicitorApiSteps.InitiateGAWithNotice();
    await ClaimantSolicitorGaApiSteps.MakePaymentForClaimIssued();
    await DefendantSolicitor1GaApiSteps.RespondToApplicationAgreed();
    await JudgeGaApiSteps.MakeDecisionAddInfo();
    await DefendantSolicitor1GaApiSteps.RespondToJudgeAddInfo();
  });
});
