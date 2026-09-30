import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';

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
      await ClaimantSolicitorSpecApiSteps.CreateClaimInter1v2DS();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
      });
      await DefendantSolicitor2SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
      });
      await ClaimantSolicitorSpecApiSteps.RespondInterProceed1v2DS();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.GenerateDirectionsOrderInter();
      await DefendantSolicitor2SpecSteps.Login();
      await DefendantSolicitor2SpecSteps.EvidenceUploadBundle();
    });
  },
);
