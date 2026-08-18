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
      CaseworkerApiSteps,
    }) => {
      await ClaimantCitizenApiSteps.CreateLipClaimFast();
      await ClaimantCitizenApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
      await DefendantCitizenApiSteps.RespondFastFullDefence();
      await ClaimantCitizenApiSteps.RespondFastRejectFullDefence();
      await JudgeApiSteps.SdoFast();
      await ClaimantCitizenApiSteps.RaiseLipQuery();
      await CaseworkerApiSteps.RespondToQuery();
      await ClaimantCitizenApiSteps.FollowUpOnLipQuery();
      await DefendantCitizenApiSteps.RaiseLipQuery();
      await CaseworkerApiSteps.RespondToQuery();
      await DefendantCitizenApiSteps.FollowUpOnLipQuery();
    });
  },
);
