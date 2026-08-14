import { test } from '../../../playwright-fixtures/index';

test.describe(
  'LIP v LIP spec stay case api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v1 JUDICIAL_REFERRAL Lip v Lip stay case dismiss case', async ({
      ClaimantCitizenApiSteps,
      DefendantCitizenApiSteps,
      CaseRoleAssignmentApiSteps,
      JudgeApiSteps,
      HearingCenterAdminApiSteps,
    }) => {
      await ClaimantCitizenApiSteps.CreateLipClaimFast();
      await ClaimantCitizenApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDC();
      await DefendantCitizenApiSteps.RespondFastFullDefence();
      await ClaimantCitizenApiSteps.RespondFastRejectFullDefence();
      await HearingCenterAdminApiSteps.StayCase();
      await HearingCenterAdminApiSteps.ManageStayRequestUpdate();
      await HearingCenterAdminApiSteps.ManageStayLiftStay();
      await JudgeApiSteps.SdoFast();
      await HearingCenterAdminApiSteps.DismissCase();
    });
  },
);
