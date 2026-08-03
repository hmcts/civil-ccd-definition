import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 unspec api journey for Small Other Remedy claim',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v1 unspec small other remedy', async ({
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1ApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimSmall1v1OtherRemedy()
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1ApiSteps.RespondFastFullDefence();
      await ClaimantSolicitorApiSteps.RespondFastProceed();
    });
  },
);
