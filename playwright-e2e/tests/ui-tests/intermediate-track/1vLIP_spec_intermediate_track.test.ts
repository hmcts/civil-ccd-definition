import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1vLIP spec intermediate track journey @debug',
  {
    tag: ['@civil-ccd-nightly'],
  },
  () => {
    test('1vLIP spec intermediate track', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantCitizenApiSteps,
      ClaimantSolicitorSpecSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimInter1vLIP();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
      await DefendantCitizenApiSteps.RespondInterFullDefence();
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.RespondInterProceed1vLIP();
    });
  },
);
