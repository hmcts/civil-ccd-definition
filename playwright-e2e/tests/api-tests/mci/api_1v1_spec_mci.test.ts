import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe(
  '1v1 spec api manage contact information journeys',
  { tag: '@civil-service-nightly' },
  async () => {
    test.fail(
      '1v1 spec api manage contact information',
      async ({
        ClaimantSolicitorSpecApiSteps,
        CaseRoleAssignmentApiSteps,
        DefendantSolicitor1SpecApiSteps,
        CaseworkerApiSteps,
      }) => {
        await ClaimantSolicitorSpecApiSteps.CreateClaim();
        await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
        await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
        await DefendantSolicitor1SpecApiSteps.DefendantResponse({
          claimTrack: ClaimTrack.SMALL_CLAIM,
        });
        await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence();
        await CaseworkerApiSteps.ManageContactInformation();
      },
    );
  },
);
