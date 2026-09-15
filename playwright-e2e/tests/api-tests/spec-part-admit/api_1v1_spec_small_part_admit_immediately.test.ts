import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import DefendantResponseSpecType from '../../../constants/ccd-events/ccd-events/defendant-response-spec/defendant-response-spec-type';

test.describe(
  '1v1 spec small part admit api journey',
  { tag: ['@civil-service-nightly', '@api-spec-part-admit'] },
  async () => {
    test('1v1 spec small part admit setup before defendant response', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmall1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.SMALL_CLAIM,
        responseType: DefendantResponseSpecType.PART_ADMISSION,
      });
      await ClaimantSolicitorSpecApiSteps.RespondSmallRejectPartAdmit();
    });
  },
);
