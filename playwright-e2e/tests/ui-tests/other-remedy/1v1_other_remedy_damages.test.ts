import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 create fast track claim with type other remedy damages',
  { tag: '@civil-ccd-nightly' },
  () => {
    test('1v1 create fast track claim with type other remedy damages', async ({
      ClaimantSolicitorSteps,
      DefendantSolicitor1ApiSteps,
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.CreateClaimFastOtherRemedy();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.RespondFastFullDefence();
      await ClaimantSolicitorApiSteps.RespondFastProceed();
    });
  },
);
