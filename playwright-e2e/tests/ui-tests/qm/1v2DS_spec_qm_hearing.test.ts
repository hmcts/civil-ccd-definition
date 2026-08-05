import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v2DS spec query management hearing journey',
  {
    tag: ['@civil-ccd-nightly'],
  },
  () => {
    test('1v2DS spec query management hearing journey', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      DefendantSolicitor2SpecApiSteps,
      JudgeApiSteps,
      ClaimantSolicitorSpecSteps,
      DefendantSolicitor1SpecSteps,
      CaseworkerSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimIntermediate1v2DS();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await DefendantSolicitor1SpecApiSteps.RespondIntermediateFullDefence();
      await DefendantSolicitor2SpecApiSteps.RespondIntermediateFullDefence();
      await ClaimantSolicitorSpecApiSteps.RespondIntermediateProceed1v2DS();
      await JudgeApiSteps.GenerateDirectionsOrderIntermediate();
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.RaiseANewQueryWithHearing();
      await DefendantSolicitor1SpecSteps.Login();
      await DefendantSolicitor1SpecSteps.RaiseANewQueryWithHearing();
      await CaseworkerSteps.Login();
      await CaseworkerSteps.CaseProceedsInCasemanSpec();
    });
  },
);
