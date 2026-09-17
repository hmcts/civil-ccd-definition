import { test } from '../../../playwright-fixtures/index';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  'Spec small claims mediation api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v2 same solicitor claimant and defendant upload mediation documents', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      CaseworkerApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({ claimType: ClaimType.ONE_VS_TWO_SAME_SOL });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.RespondSmallFullDefence1v2SS();
      await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence1v2SS();
      await CaseworkerApiSteps.MediationUnsuccessful();
      await ClaimantSolicitorSpecApiSteps.UploadMediationDocuments();
      await DefendantSolicitor1SpecApiSteps.UploadMediationDocuments();
    });

    test('1v2 different solicitor claimant and defendant upload mediation documents', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      DefendantSolicitor2SpecApiSteps,
      CaseworkerApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({ claimType: ClaimType.ONE_VS_TWO_DIFF_SOL });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await DefendantSolicitor1SpecApiSteps.RespondSmallFullDefence();
      await DefendantSolicitor2SpecApiSteps.RespondSmallFullDefence();
      await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence1v2DS();
      await CaseworkerApiSteps.MediationUnsuccessful();
      await ClaimantSolicitorSpecApiSteps.UploadMediationDocuments();
      await DefendantSolicitor1SpecApiSteps.UploadMediationDocuments();
      await DefendantSolicitor2SpecApiSteps.UploadMediationDocuments();
    });
  },
);
