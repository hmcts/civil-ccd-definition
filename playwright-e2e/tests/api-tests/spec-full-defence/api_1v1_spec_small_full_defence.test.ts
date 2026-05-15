import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 spec small full defence api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test.only('1v1 spec small full defence', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmallTrack1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.RespondSmallTrackFullDefence1v1();
      await ClaimantSolicitorSpecApiSteps.RespondSmallClaimIntentToProceed1v1();
    });
  },
);
