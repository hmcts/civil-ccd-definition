import { test } from '../../../playwright-fixtures/index';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  'Spec small claims mediation api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('2v1 claimant and defendant upload mediation documents', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      CaseworkerApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({ claimType: ClaimType.TWO_VS_ONE });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.RespondSmallFullDefence2v1();
      await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence2v1();
      await CaseworkerApiSteps.MediationUnsuccessful();
      await ClaimantSolicitorSpecApiSteps.UploadMediationDocuments2v1();
      await DefendantSolicitor1SpecApiSteps.UploadMediationDocuments();
    });
  },
);
