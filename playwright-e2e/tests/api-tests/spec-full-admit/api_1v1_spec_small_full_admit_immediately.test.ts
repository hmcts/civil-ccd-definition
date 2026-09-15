import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import DefendantResponseSpecType from '../../../constants/ccd-events/ccd-events/defendant-response-spec/defendant-response-spec-type';

test.describe(
  '1v1 spec small claims full admit api journey',
  { tag: ['@civil-service-nightly', '@api-spec-full-admit'] },
  async () => {
    test('1v1 spec small claims full admit setup before defendant response', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmall1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.INTERMEDIATE_CLAIM,
        responseType: DefendantResponseSpecType.FULL_ADMISSION,
      });
      await ClaimantSolicitorSpecApiSteps.RespondFullAdmitImmediately();
    });
  },
);
