import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import DefendantResponseSpecType from '../../../constants/ccd-events/ccd-events/defendant-response-spec/defendant-response-spec-type';
import DefenceAdmittedPartRouteSpec from '../../../constants/ccd-events/ccd-events/defendant-response-spec/defence-admitted-part-route-spec';

test.describe(
  '1v1 spec small claims mediation api journey',
  { tag: ['@civil-service-nightly'] },
  async () => {
    test(
      '1v1 claimant and defendant part admit states paid- claimant not received payment - upload mediation documents',
      { tag: ['@civil-service-master', '@civil-service-pr'] },
      async ({
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
          responseType: DefendantResponseSpecType.PART_ADMISSION,
          defenceAdmittedPartRoute: DefenceAdmittedPartRouteSpec.HAS_PAID,
        });
        await ClaimantSolicitorSpecApiSteps.RespondSmallRejectPartAdmitPaidConfirmNotPaid();
        await CaseworkerApiSteps.MediationUnsuccessful();
        await ClaimantSolicitorSpecApiSteps.UploadMediationDocuments();
        await DefendantSolicitor1SpecApiSteps.UploadMediationDocuments();
        await LegalAdvisorApiSteps.SdoSmallNoSum();
      },
    );

    test('1v1 claimant and defendant part admit states paid- claimant received payment rejects PA - upload mediation documents', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      CaseworkerApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmall1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.SMALL_CLAIM,
        responseType: DefendantResponseSpecType.PART_ADMISSION,
        defenceAdmittedPartRoute: DefenceAdmittedPartRouteSpec.HAS_PAID,
      });
      await ClaimantSolicitorSpecApiSteps.RespondSmallRejectPartAdmitPaidConfirmNotPaid();
      await CaseworkerApiSteps.MediationUnsuccessful();
      await ClaimantSolicitorSpecApiSteps.UploadMediationDocuments();
      await DefendantSolicitor1SpecApiSteps.UploadMediationDocuments();
    });

    test('1v1 claimant and defendant part admit reject upload mediation documents', async ({
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
        responseType: DefendantResponseSpecType.PART_ADMISSION,
      });
      await ClaimantSolicitorSpecApiSteps.RespondMultiRejectPartAdmit();
      await CaseworkerApiSteps.MediationUnsuccessful();
      await ClaimantSolicitorSpecApiSteps.UploadMediationDocuments();
      await DefendantSolicitor1SpecApiSteps.UploadMediationDocuments();
      await LegalAdvisorApiSteps.SdoSmallSum();
    });

    test(
      '1v1 claimant and defendant upload mediation documents',
      { tag: '@api-mediation' },
      async ({
        ClaimantSolicitorSpecApiSteps,
        CaseRoleAssignmentApiSteps,
        DefendantSolicitor1SpecApiSteps,
        LegalAdvisorApiSteps,
        CaseworkerApiSteps,
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
        await LegalAdvisorApiSteps.SdoSmallSum();
      },
    );
  },
);
