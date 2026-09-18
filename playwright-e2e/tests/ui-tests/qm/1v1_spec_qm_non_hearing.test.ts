import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe(
  '1v1 spec query management non-hearing journey',
  {
    tag: ['@civil-ccd-nightly', '@ui-qm'],
  },
  () => {
    test('1v1 spec query management non-hearing journey', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      JudgeApiSteps,
      ClaimantSolicitorSpecSteps,
      DefendantSolicitor1SpecSteps,
      CaseworkerSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimInter1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
      });
      await ClaimantSolicitorSpecApiSteps.RespondInterRejectFullDefence();
      await JudgeApiSteps.GenerateDirectionsOrderInter();
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.RaiseANewQuery();
      await DefendantSolicitor1SpecSteps.Login();
      await DefendantSolicitor1SpecSteps.RaiseANewQuery();
      await CaseworkerSteps.Login();
      await CaseworkerSteps.CaseProceedsInCasemanSpec();
    });
  },
);
