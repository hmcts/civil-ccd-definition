import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe(
  'Dispute resolution hearing API test - spec small claim',
  { tag: ['@civil-service-nightly', '@api-drh'] },
  async () => {
    test('1v1 spec small create SDO for DRH', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      CaseworkerApiSteps,
      LegalAdvisorApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmall1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.SMALL_CLAIM,
      });
      await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence();
      await CaseworkerApiSteps.MediationUnsuccessful();
      await ClaimantSolicitorSpecApiSteps.UploadMediationDocuments();
      await DefendantSolicitor1SpecApiSteps.UploadMediationDocuments();
      await LegalAdvisorApiSteps.SdoSmallSumDRH();
    });
  },
);
