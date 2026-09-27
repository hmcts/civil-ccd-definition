import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v2DS intermediate track journey',
  {
    tag: ['@civil-ccd-nightly', '@ui-intermediate-track'],
  },
  () => {
    test('1v2DS intermediate track', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      DefendantSolicitor2ApiSteps,
      JudgeSteps,
      DefendantSolicitor2Steps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaim({
        claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
        claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
      });
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.RespondInterFullDefence();
      await DefendantSolicitor2ApiSteps.RespondInterFullDefence();
      await ClaimantSolicitorApiSteps.RespondInterProceed1v2DS();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.GenerateDirectionsOrderInter();
      await DefendantSolicitor2Steps.Login();
      await DefendantSolicitor2Steps.EvidenceUploadBundle();
    });
  },
);
