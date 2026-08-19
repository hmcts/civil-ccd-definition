import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 create fast track claim with type housing disrepair and default judgment',
  { tag: '@civil-ccd-nightly' },
  () => {
    test('1v1 create fast track claim with type housing disrepair and default judgment', async ({
      ClaimantSolicitorApiSteps,
      ClaimantSolicitorSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.CreateClaimFastHousingDisrepair1v1();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.RequestDefaultJudgmentOtherRemedy();
    });
  },
);
