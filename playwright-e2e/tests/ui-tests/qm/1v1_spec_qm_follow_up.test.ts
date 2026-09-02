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
      CtscAdminSteps,
      ClaimantSolicitorSpecSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimInter1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.RespondInterFullDefence();
      await ClaimantSolicitorSpecApiSteps.RespondInterRejectFullDefence();
      await JudgeApiSteps.GenerateDirectionsOrderInter();
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.RaiseANewQuery();
      await CtscAdminSteps.Login();
      await CtscAdminSteps.RespondToQuery();
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.RaiseFollowUpQuery();
    });
  },
);
