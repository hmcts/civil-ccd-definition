import { test } from '../../../playwright-fixtures';

test.describe(
  '1v1 spec request for reconsideration with options',
  {
    tag: ['@civil-ccd-nightly'],
  },
  () => {
    test('1v1 spec request for reconsideration > no, create new sdo', async ({
      ClaimantSolicitorSpecApiSteps,
      DefendantSolicitor1SpecApiSteps,
      CaseRoleAssignmentApiSteps,
      CaseworkerSteps,
      LegalAdvisorApiSteps,
      ClaimantSolicitorSpecSteps,
      JudgeSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmallTrack1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.RespondSmallTrackFullDefence1v1();
      await ClaimantSolicitorSpecApiSteps.RespondSmallClaimIntentToProceed1v1();
      await CaseworkerSteps.Login();
      await CaseworkerSteps.MediationUnsuccessful();
      await LegalAdvisorApiSteps.CreateSdoSmallTrack();
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.RequestForReconsideration();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.DecisionOnReconsiderationRequestCreateSdo();
    });

    test('1v1 spec request for reconsideration > yes, uphold the previous order made', async ({
      ClaimantSolicitorSpecApiSteps,
      DefendantSolicitor1SpecApiSteps,
      CaseRoleAssignmentApiSteps,
      CaseworkerSteps,
      LegalAdvisorApiSteps,
      ClaimantSolicitorSpecSteps,
      JudgeSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmallTrack1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.RespondSmallTrackFullDefence1v1();
      await ClaimantSolicitorSpecApiSteps.RespondSmallClaimIntentToProceed1v1();
      await CaseworkerSteps.Login();
      await CaseworkerSteps.MediationUnsuccessful();
      await LegalAdvisorApiSteps.CreateSdoSmallTrack();
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.RequestForReconsideration();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.DecisionOnReconsiderationRequestUpholdOrder();
    });

    test('1v1 spec request for reconsideration > no, previous order needs amending', async ({
      ClaimantSolicitorSpecApiSteps,
      DefendantSolicitor1SpecApiSteps,
      CaseRoleAssignmentApiSteps,
      CaseworkerSteps,
      LegalAdvisorApiSteps,
      ClaimantSolicitorSpecSteps,
      JudgeSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimSmallTrack1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.RespondSmallTrackFullDefence1v1();
      await ClaimantSolicitorSpecApiSteps.RespondSmallClaimIntentToProceed1v1();
      await CaseworkerSteps.Login();
      await CaseworkerSteps.MediationUnsuccessful();
      await LegalAdvisorApiSteps.CreateSdoSmallTrack();
      await ClaimantSolicitorSpecSteps.Login();
      await ClaimantSolicitorSpecSteps.RequestForReconsideration();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.DecisionOnReconsiderationRequestPreviousOrderNeedsAmending();
    });
  },
);
