import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 spec query management follow up journey',
  {
    tag: ['@civil-ccd-nightly'],
  },
  () => {
    test('1v1 spec query management follow up journey', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      JudgeApiSteps,
      ClaimantSolicitorSpecSteps,
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
      await CaseworkerSteps.LoginCTSC();
      await CaseworkerSteps.RespondToQuery();
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.RaiseFollowUpQuery();
      await CaseworkerSteps.LoginCTSC();
      await CaseworkerSteps.VerifyQueryResponseAndFollowup();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.VerifyQueryResponseAndFollowup();
    });
  },
);
