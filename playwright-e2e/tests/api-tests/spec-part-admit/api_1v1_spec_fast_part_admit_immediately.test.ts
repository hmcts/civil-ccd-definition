import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import DefendantResponseSpecType from '../../../constants/ccd-events/ccd-events/defendant-response-spec/defendant-response-spec-type';

test.describe('1v1 spec part admit api journey', { tag: ['@civil-service-nightly', '@api-spec-part-admit'] }, async () => {
  test('1v1 spec part admit', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaim({ claimTrack: ClaimTrack.FAST_CLAIM });
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecApiSteps.DefendantResponse({
      claimTrack: ClaimTrack.FAST_CLAIM,
      responseType: DefendantResponseSpecType.PART_ADMISSION,
    });
    await ClaimantSolicitorSpecApiSteps.RespondFastRejectPartAdmit();
  });
});
