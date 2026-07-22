import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 spec flight delay api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v1 spec flight delay api', async ({
                                                    ClaimantSolicitorSpecApiSteps,
                                                    CaseRoleAssignmentApiSteps,
                                                  }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmallTrackFlightDelay1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    });
  },
);
