import config from '../../../../config/config';
import { test } from '../../../../playwright-fixtures';
import ClaimTrack from '../../../../constants/cases/claim-track';
import ClaimType from '../../../../constants/cases/claim-type';

test.describe(
  '1v2DS spec - respond to application - Hearing order journey',
  { tag: ['@civil-ccd-nightly', '@ui-ga-hearing-notice'] },
  () => {
    test('GA for Specified Claim 1v2 different Solicitor - respond to application - Hearing order journey', async ({
      ClaimantSolicitorSpecApiSteps,
      ClaimantSolicitorSpecSteps,
      ClaimantSolicitorGaSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecSteps,
      DefendantSolicitor2SpecSteps,
      DefendantSolicitor2GaSteps,
      DefendantSolicitor1GaApiSteps,
      JudgeGaSteps
    }) => {
      test.fail(config.zodValidationEnabled);
      await ClaimantSolicitorSpecApiSteps.CreateClaim({
        claimTrack: ClaimTrack.FAST_CLAIM,
        claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await DefendantSolicitor1SpecSteps.Login();
      await DefendantSolicitor1SpecSteps.InitiateGeneralApplication();
      await DefendantSolicitor1GaApiSteps.MakePaymentForClaimIssued();
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorGaSteps.RespondToApplication();
      await DefendantSolicitor2SpecSteps.Login();
      await DefendantSolicitor2GaSteps.RespondToApplication();
      await JudgeGaSteps.Login()
      await JudgeGaSteps.MakeADecisionListHearing();
    });
  },
);
