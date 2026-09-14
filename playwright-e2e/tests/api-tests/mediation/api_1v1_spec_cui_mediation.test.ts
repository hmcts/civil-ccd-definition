import { test } from '../../../playwright-fixtures/index';

test.describe('Unsuccessful mediation for spec small claim with unrepresented defendant', { tag: ['@civil-service-nightly', '@api-mediation'] }, async () => {
  test('Unsuccessful mediation for spec small claim with unrepresented defendant', { tag: ['@civil-service-master', '@civil-service-pr'] }, async ({
    ClaimantSolicitorSpecApiSteps,
    DefendantCitizenApiSteps,
    CaseRoleAssignmentApiSteps,
    CaseworkerApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmall1vLIP();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
    await DefendantCitizenApiSteps.RespondSmallFullDefence();
    await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence();
    await CaseworkerApiSteps.MediationUnsuccessful();
  });
});
