import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe(
  '1v1 spec full defence api journey',
  { tag: ['@civil-service-nightly', '@api-spec-full-defence'] },
  async () => {
    test('1v1 spec full defence', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.InformAgreedExtensionDateSpec();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.FAST_CLAIM,
      });
      await ClaimantSolicitorSpecApiSteps.RespondFastRejectFullDefence();
    });
  },
);
