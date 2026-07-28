import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 spec flight delay api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v1 spec flight delay other airline api @debug', async ({
        ClaimantSolicitorSpecApiSteps,
        CaseRoleAssignmentApiSteps,
        DefendantSolicitor1SpecApiSteps,
        JudgeApiSteps,
        CaseworkerApiSteps,
      }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmallFlightDelayOther()
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.RespondSmallFullDefence()
      await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence();
      await CaseworkerApiSteps.MediationUnsuccessful();
      await JudgeApiSteps.SdoSmallNoSumFlightDelay();
    });

    test('1v1 spec flight delay api', async ({
        ClaimantSolicitorSpecApiSteps,
        CaseRoleAssignmentApiSteps,
        DefendantSolicitor1SpecApiSteps,
        JudgeApiSteps,
        CaseworkerApiSteps,
      }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmallFlightDelay();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.RespondSmallFullDefence()
      await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence();
      await CaseworkerApiSteps.MediationUnsuccessful();
      await JudgeApiSteps.SdoSmallSumFlightDelay();
    });
  },
);
