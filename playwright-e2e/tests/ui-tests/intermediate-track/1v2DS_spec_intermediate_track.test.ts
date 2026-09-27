import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v2DS spec intermediate track journey',
  {
    tag: ['@civil-ccd-nightly', '@ui-intermediate-track'],
  },
  () => {
    test('1v2DS spec intermediate track', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      DefendantSolicitor2SpecApiSteps,
      JudgeSteps,
      DefendantSolicitor2SpecSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({
        claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
        claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await DefendantSolicitor1SpecApiSteps.RespondInterFullDefence();
      await DefendantSolicitor2SpecApiSteps.RespondInterFullDefence();
      await ClaimantSolicitorSpecApiSteps.RespondInterProceed1v2DS();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.GenerateDirectionsOrderInter();
      await DefendantSolicitor2SpecSteps.Login();
      await DefendantSolicitor2SpecSteps.EvidenceUploadBundle();
    });
  },
);
