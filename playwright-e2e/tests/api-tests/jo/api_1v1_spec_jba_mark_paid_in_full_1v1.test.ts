import { test } from '../../../playwright-fixtures/index';

test.describe(
  'Spec 1v1 judgment by admission mark paid in full api test',
  
  async () => {
    test('1v1 LR v LR defendant response with full admit pay by set date judgment by admission mark paid in full', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.RespondFullAdmitSetDate();
      await ClaimantSolicitorSpecApiSteps.RespondAcceptFullAdmitRepayment();
      await ClaimantSolicitorSpecApiSteps.JudgmentPaidInFull();
    });
  },
);
