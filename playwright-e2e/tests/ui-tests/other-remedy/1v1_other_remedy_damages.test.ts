import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 create fast track claim with type other remedy damages',
  { tag: '@civil-ccd-nightly' },
  () => {
    test('1v1 create fast track claim with type other remedy damages', async ({
      ClaimantSolicitorSteps,
      DefendantSolicitor1Steps,
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.CreateClaimFastOtherRemedy1v1();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorSteps.NotifyClaimDetails();
      await DefendantSolicitor1Steps.Login();
      await DefendantSolicitor1Steps.RespondFastFullDefence1v1();
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.RespondFastProceed1v1();
    });
  },
);
