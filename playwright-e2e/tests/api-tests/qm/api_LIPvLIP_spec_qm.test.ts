import { test } from '../../../playwright-fixtures/index';

test.describe(
  'LR v LIP query management spec api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('LR v LIP query management spec', async ({
      ClaimantCitizenApiSteps,
      DefendantCitizenApiSteps,
      CaseRoleAssignmentApiSteps,
      JudgeApiSteps,
    }) => {
      await ClaimantCitizenApiSteps.CreateLipClaimFast();
      await ClaimantCitizenApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
      await DefendantCitizenApiSteps.RespondFastFullDefence();
      await ClaimantCitizenApiSteps.RespondFastRejectFullDefence();
      await JudgeApiSteps.SdoFast();
    });
  },
);
