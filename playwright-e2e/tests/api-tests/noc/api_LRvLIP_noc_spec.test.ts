import { test } from '../../../playwright-fixtures/index';

test.describe(
  'LR v LiP notice of change spec api journey',
  
  async () => {
    test('LR v LiP notice of change', async ({
      ClaimantCitizenApiSteps,
      ClaimantSolicitorApiSteps,
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantCitizenApiSteps,
    }) => {
      await ClaimantCitizenApiSteps.CreateLipClaimSmall();
      await ClaimantCitizenApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NoticeOfChangeC1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
      await DefendantCitizenApiSteps.RespondSmallFullDefence();
      await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence();
    });
  },
);
