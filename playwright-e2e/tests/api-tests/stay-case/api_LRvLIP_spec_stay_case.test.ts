import { test } from '../../../playwright-fixtures/index';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  'LR v LIP spec stay case api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('LR v LIP spec stay case', async ({
      ClaimantSolicitorSpecApiSteps,
      DefendantCitizenApiSteps,
      CaseRoleAssignmentApiSteps,
      JudgeApiSteps,
      HearingCenterAdminApiSteps,
      CaseworkerApiSteps,
      CtscAdminApiSteps,
      LegalAdvisorApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaim({ claimType: ClaimType.ONE_VS_ONE_LIP });
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
      await DefendantCitizenApiSteps.RespondSmallFullDefence();
      await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence();
      await HearingCenterAdminApiSteps.StayCase();
      await HearingCenterAdminApiSteps.ManageStayRequestUpdate();
      await CtscAdminApiSteps.SendMessage();
      await JudgeApiSteps.ReplyMessage();
      await CaseworkerApiSteps.ReplyMessage();
      await HearingCenterAdminApiSteps.ManageStayLiftStay();
      await LegalAdvisorApiSteps.SdoSmallSum();
      await HearingCenterAdminApiSteps.DismissCase();
    });
  },
);
