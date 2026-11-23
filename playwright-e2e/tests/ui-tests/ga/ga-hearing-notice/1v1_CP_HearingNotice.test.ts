import config from '../../../../config/config';
import ClaimTrack from '../../../../constants/cases/claim-track';
import { test } from '../../../../playwright-fixtures';

test.describe(
  'Before SDO 1v1 - GA CP - Hearing Notice document',
  { tag: ['@civil-ccd-nightly', '@ui-ga-hearing-notice', '@civil-ccd-master', '@civil-ccd-pr'] },
  () => {
    test('Claimant and Defendant Hearing notice - With notice journey', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      ClaimantSolicitorGaApiSteps,
      DefendantSolicitor1GaApiSteps,
      JudgeGaApiSteps,
      HearingCenterAdminGaSteps,
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
      await HearingCenterAdminGaSteps.Login();
      await HearingCenterAdminGaSteps.HearingScheduledGa();
    });
  },
);
