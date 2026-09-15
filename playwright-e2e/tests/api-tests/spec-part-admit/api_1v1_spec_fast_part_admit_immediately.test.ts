import { test } from '../../../playwright-fixtures/index';
import DefendantResponseSpecType from '../../../constants/ccd-events/ccd-events/defendant-response-spec/defendant-response-spec-type';

test.describe(
  '1v1 spec part admit api journey',
  { tag: ['@civil-service-nightly', '@api-spec-part-admit'] },
  async () => {
    test('1v1 spec part admit', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        responseType: DefendantResponseSpecType.PART_ADMISSION,
      });
      await ClaimantSolicitorSpecApiSteps.RespondFastRejectPartAdmit();
    });
  },
);
