import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v2SS spec SDO Carm - Upload mediation documents',
 
  () => {
    test('1v2SS spec SDO Carm - Upload mediation documents', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      CaseworkerApiSteps,
      LegalAdvisorApiSteps,
      ClaimantSolicitorSpecSteps,
      HearingCenterAdminApiSteps,
      DefendantSolicitor1SpecSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmall1v2SS();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignBothCaseRolesToDS1();
      await DefendantSolicitor1SpecApiSteps.RespondSmallFullDefence1v2SS();
      await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence1v2SS();
      await CaseworkerApiSteps.MediationUnsuccessful();
      await LegalAdvisorApiSteps.SdoSmallSum();
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.UploadMediationDocuments();
      await HearingCenterAdminApiSteps.ScheduleHearingSmallTrail();
      await DefendantSolicitor1SpecSteps.Login();
      await DefendantSolicitor1SpecSteps.UploadMediationDocumentsD1();
      await HearingCenterAdminApiSteps.AmendHearingDueDate();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForHearingFee();
      await DefendantSolicitor1SpecSteps.Login();
      await DefendantSolicitor1SpecSteps.UploadMediationDocumentsD2();
    });
  },
);
