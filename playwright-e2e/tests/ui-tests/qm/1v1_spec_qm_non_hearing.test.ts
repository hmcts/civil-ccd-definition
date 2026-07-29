import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 spec query management non-hearing journey',
  {
    tag: ['@civil-ccd-nightly'],
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
      JudgeSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimIntermediate1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.RespondIntermediateFullDefence();
      await ClaimantSolicitorSpecApiSteps.RespondIntermediateRejectFullDefence();
      await JudgeApiSteps.GenerateDirectionsOrderIntermediate();
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.RaiseANewQuery();
      await DefendantSolicitor1SpecSteps.Login();
      await DefendantSolicitor1SpecSteps.RaiseANewQuery();
      await CaseworkerSteps.LoginCTSC();
      await CaseworkerSteps.VerifyQueryNonHearing();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.VerifyQueryNonHearing();
      await CaseworkerSteps.Login();
      await CaseworkerSteps.CaseProceedsInCasemanSpec();
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.VerifyQueryCaseOffline();
    });
  },
);
