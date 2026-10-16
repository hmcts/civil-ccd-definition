import config from '../../../../config/config';
import ClaimTrack from '../../../../constants/cases/claim-track';
import { test } from '../../../../playwright-fixtures';

test.describe(
  'Before SDO 1v1 - GA CP - Applications Orders',
  { tag: ['@civil-ccd-nightly', '@ui-ga-final-order', '@civil-ccd-master', '@civil-ccd-pr'] },
  () => {
    test('1v1 - Free form order - With notice journey', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      ClaimantSolicitorGaApiSteps,
      DefendantSolicitor1GaApiSteps,
      JudgeGaApiSteps,
      HearingCenterAdminGaApiSteps,
      JudgeGaSteps,
    }) => {
      test.fail(config.zodValidationEnabled);
      await ClaimantSolicitorApiSteps.CreateClaim({ claimTrack: ClaimTrack.FAST_CLAIM });
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.DefendantResponse({ claimTrack: ClaimTrack.FAST_CLAIM });
      await ClaimantSolicitorApiSteps.RespondFastProceed();
      await ClaimantSolicitorApiSteps.InitiateGAWithNotice();
      await ClaimantSolicitorGaApiSteps.MakePaymentForClaimIssued();
      await DefendantSolicitor1GaApiSteps.RespondToApplicationAgreed();
      await JudgeGaApiSteps.MakeADecisionListHearing();
      await HearingCenterAdminGaApiSteps.HearingScheduledGa();
      await JudgeGaSteps.Login();
      await JudgeGaSteps.GenerateDirectionsOrderFreeFormWithoutNotice();
    });

    test('1v1 - Assisted order - Without Further Hearing', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      ClaimantSolicitorGaApiSteps,
      DefendantSolicitor1GaApiSteps,
      JudgeGaApiSteps,
      HearingCenterAdminGaApiSteps,
      JudgeGaSteps,
    }) => {
      test.fail(config.zodValidationEnabled);
      await ClaimantSolicitorApiSteps.CreateClaim({ claimTrack: ClaimTrack.FAST_CLAIM });
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.DefendantResponse({ claimTrack: ClaimTrack.FAST_CLAIM });
      await ClaimantSolicitorApiSteps.RespondFastProceed();
      await ClaimantSolicitorApiSteps.InitiateGAWithNotice();
      await ClaimantSolicitorGaApiSteps.MakePaymentForClaimIssued();
      await DefendantSolicitor1GaApiSteps.RespondToApplicationAgreed();
      await JudgeGaApiSteps.MakeADecisionListHearing();
      await HearingCenterAdminGaApiSteps.HearingScheduledGa();
      await JudgeGaApiSteps.GenerateDirectionsOrderAssistedWithoutFurtherHearing();
      await JudgeGaSteps.Login();
    });
  },
);
