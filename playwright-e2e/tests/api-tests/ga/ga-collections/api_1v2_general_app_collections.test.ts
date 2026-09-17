import { test } from '../../../../playwright-fixtures';
import ClaimTrack from '../../../../constants/cases/claim-track';
import ClaimType from '../../../../constants/cases/claim-type';

test.describe(
  'GA 1v2 application collection for different solicitor API tests',
  { tag: '@civil-service-nightly' },
  () => {
    test.fail(
      'GA 1v2 - Without Notice Application Collection After Judge Makes Decision List for Hearing',
      async ({
        ClaimantSolicitorApiSteps,
        CaseRoleAssignmentApiSteps,
        DefendantSolicitor1ApiSteps,
        DefendantSolicitor2ApiSteps,
        ClaimantSolicitorGaApiSteps,
        JudgeGaApiSteps,
      }) => {
        await ClaimantSolicitorApiSteps.CreateClaim({
          claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
          claimTrack: ClaimTrack.FAST_CLAIM,
        });
        await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
        await ClaimantSolicitorApiSteps.NotifyClaim();
        await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
        await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
        await ClaimantSolicitorApiSteps.NotifyClaimDetails();
        await DefendantSolicitor1ApiSteps.RespondFastFullDefence();
        await DefendantSolicitor2ApiSteps.RespondFastFullDefence();
        await ClaimantSolicitorApiSteps.RespondFastProceed1v2DS();
        await ClaimantSolicitorApiSteps.InitiateGA();
        await ClaimantSolicitorGaApiSteps.MakePaymentForClaimIssued();
        await JudgeGaApiSteps.MakeADecisionListHearing();
      },
    );
  },
);
