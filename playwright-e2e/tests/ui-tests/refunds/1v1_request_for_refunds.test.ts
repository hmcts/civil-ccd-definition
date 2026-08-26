import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 create fast claim - request and processing of refunds',
 
  () => {
    test('request and approve a returned refund', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      ClaimantSolicitorSteps,
      DefendantSolicitor1Steps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimFast1v1();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await ClaimantSolicitorApiSteps.CreateAPBAPayment();
      await ClaimantSolicitorApiSteps.RollbackPaymentDate();
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.RequestRefund();
      await DefendantSolicitor1Steps.Login();
      await DefendantSolicitor1Steps.ReturnRefund();
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.AmendReturnedRefund();
      await DefendantSolicitor1Steps.Login();
      await DefendantSolicitor1Steps.ApproveRefund();
    });

    test('request and reject a returned refund', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      ClaimantSolicitorSteps,
      DefendantSolicitor1Steps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimFast1v1();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await ClaimantSolicitorApiSteps.CreateAPBAPayment();
      await ClaimantSolicitorApiSteps.RollbackPaymentDate();
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.RequestRefund();
      await DefendantSolicitor1Steps.Login();
      await DefendantSolicitor1Steps.ReturnRefund();
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.AmendReturnedRefund();
      await DefendantSolicitor1Steps.Login();
      await DefendantSolicitor1Steps.RejectRefund();
    });
  },
);
