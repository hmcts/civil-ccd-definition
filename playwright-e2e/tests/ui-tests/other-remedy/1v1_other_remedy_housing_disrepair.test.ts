import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 create fast track claim with type housing disrepair',
  { tag: '@civil-ccd-nightly' },
  () => {
    test('1v1 create fast track claim with type housing disrepair', async ({
      ClaimantSolicitorSteps,
      DefendantSolicitor1Steps,
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      HearingCenterAdminSteps,
      JudgeSteps,
    }) => {
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.CreateClaimFast1v1HousingDisrepair();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorSteps.NotifyClaimDetails();
      await DefendantSolicitor1Steps.Login();
      await DefendantSolicitor1Steps.AcknowledgeClaimFullDefence();
      await DefendantSolicitor1Steps.InformAgreedExtensionDate();
      await DefendantSolicitor1Steps.AddLitigationFriend();
      await DefendantSolicitor1Steps.RespondFastFullDefence1v1();
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.RespondFastProceed1v1();
      await HearingCenterAdminSteps.LoginRegion1();
      await HearingCenterAdminSteps.CreateClaimant1CaseFlagVulnerable();
      await HearingCenterAdminSteps.CreateDefendantSolicitor1ExpertCaseFlag();
      await HearingCenterAdminSteps.UpdateClaimant1CaseFlagComment();
      await HearingCenterAdminSteps.UpdateDefendantSolicitor1ExpertCaseFlagComment();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.SdoFastOtherRemedy();
    });
  },
);
