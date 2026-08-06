import { test } from '../../../playwright-fixtures/index';

test.describe(
  '2v1 spec - SDO Carm - Upload mediation documents',
  { tag: '@civil-ccd-nightly' },
  () => {
    test('2v1 spec - SDO Carm - Upload mediation documents', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      CaseworkerApiSteps,
      ClaimantSolicitorSpecSteps,
      DefendantSolicitor1SpecSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmall2v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.RespondSmallFullDefence2v1();
      await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence2v1();
      await CaseworkerApiSteps.MediationUnsuccessful();
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.UploadMediationDocuments2v1();
      await DefendantSolicitor1SpecSteps.Login();
      await DefendantSolicitor1SpecSteps.UploadMediationDocumentsD1();
    });
  },
);
