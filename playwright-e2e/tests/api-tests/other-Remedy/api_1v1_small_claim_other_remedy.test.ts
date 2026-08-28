import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 unspec api journey for Small Other Remedy claim',
  
  async () => {
    test('1v1 unspec small other remedy', async ({
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1ApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimSmallOtherRemedy1v1()
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1ApiSteps.RespondFastFullDefence();
      await ClaimantSolicitorApiSteps.RespondFastProceed();
    });
  },
);
