import { test } from '../../../playwright-fixtures/index';

test.describe('1v2SS spec notice of change api journey', { tag: '@civil-service-nightly' }, async () => {
  test('1vSS spec notice of change', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecApiSteps,
    DefendantSolicitor2SpecApiSteps
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v2SS();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor2SpecApiSteps.NoticeOfChange(); 
    await DefendantSolicitor1SpecApiSteps.RespondFastFullDefence();
    await DefendantSolicitor2SpecApiSteps.RespondFastFullDefence();
  });
});
