import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v2SS intermediate track journey',
  {
    tag: ['@civil-ccd-nightly', '@ui-intermediate-track'],
  },
  () => {
    test('1v2SS intermediate track', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      ClaimantSolicitorSteps,
      DefendantSolicitor1Steps,
      JudgeSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimInter1v2SS();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
        claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      });
      await ClaimantSolicitorApiSteps.RespondInterProceed1v2SS();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.GenerateDirectionsOrderInter();
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.EvidenceUploadBundle();
      await DefendantSolicitor1Steps.Login();
      await DefendantSolicitor1Steps.EvidenceUploadBundle1v2SS();
    });
  },
);
