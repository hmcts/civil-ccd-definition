import config from '../../../../config/config';
import { test } from '../../../../playwright-fixtures';
import ClaimTrack from '../../../../constants/cases/claim-track';

test.describe(
  'Before SDO 1v2 - GA CP - Applications Orders',
  { tag: ['@civil-ccd-nightly', '@ui-ga-final-order', '@civil-ccd-master', '@civil-ccd-pr'] },
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
      test.fail(config.zodValidationEnabled);
      await ClaimantSolicitorApiSteps.CreateClaimFast1v2DS();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.DefendantResponse({ claimTrack: ClaimTrack.FAST_CLAIM });
      await DefendantSolicitor2ApiSteps.DefendantResponse({ claimTrack: ClaimTrack.FAST_CLAIM });
      await ClaimantSolicitorApiSteps.RespondFastProceed1v2DS();
      await ClaimantSolicitorApiSteps.InitiateGA();
      await ClaimantSolicitorGaApiSteps.MakePaymentForClaimIssued();
      await JudgeGaApiSteps.MakeADecisionListHearing();
      await HearingCenterAdminGaApiSteps.HearingScheduledGa();
      await JudgeGaSteps.Login();
      await JudgeGaSteps.GenerateDirectionsOrderAssistedWithoutNotice();
    });
  },
);
