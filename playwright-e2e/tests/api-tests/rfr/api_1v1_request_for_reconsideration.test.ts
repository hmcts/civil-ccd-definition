import { test } from '../../../playwright-fixtures/index';

test.describe('Request for reconsideration - 1v1 - spec', { tag: '@civil-service-nightly' }, async () => {
  test('1v1 spec request for reconsideration for uphold previous order', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecApiSteps,
    LegalAdvisorApiSteps,
    CaseworkerApiSteps,
    JudgeApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmallTrack1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecApiSteps.RespondSmallFullDefence();
    await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence();
    await CaseworkerApiSteps.MediationUnsuccessful();
    await LegalAdvisorApiSteps.SdoSmallTrackNoSum();
    await ClaimantSolicitorSpecApiSteps.RequestForReconsideration();
    await JudgeApiSteps.DecisionOnReconsiderationRequestUphold();
  });

  test('1v1 spec request for reconsideration for create new SDO', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecApiSteps,
    LegalAdvisorApiSteps,
    CaseworkerApiSteps,
    JudgeApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmallTrack1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecApiSteps.RespondSmallFullDefence();
    await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence();
    await CaseworkerApiSteps.MediationUnsuccessful();
    await LegalAdvisorApiSteps.SdoSmallTrackNoSum();
    await DefendantSolicitor1SpecApiSteps.RequestForReconsideration();
    await JudgeApiSteps.DecisionOnReconsiderationRequestSdo();
    await JudgeApiSteps.SdoSmallTrackNoSum();
  });

  test('1v1 spec request for reconsideration for create general order', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecApiSteps,
    LegalAdvisorApiSteps,
    CaseworkerApiSteps,
    JudgeApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmallTrack1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecApiSteps.RespondSmallFullDefence();
    await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence();
    await CaseworkerApiSteps.MediationUnsuccessful();
    await LegalAdvisorApiSteps.SdoSmallTrackNoSum();
    await DefendantSolicitor1SpecApiSteps.RequestForReconsideration();
    await JudgeApiSteps.DecisionOnReconsiderationRequestAmend();
  });

  test('1v1 spec request for reconsideration when claim amount is greater than 1000', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecApiSteps,
    JudgeApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecApiSteps.RespondFastFullDefence();
    await ClaimantSolicitorSpecApiSteps.RespondFastRejectFullDefence();
    await JudgeApiSteps.SdoFast();
    await ClaimantSolicitorSpecApiSteps.RequestForReconsiderationError();
  });

  test('1v1 spec request for reconsideration for create a new SDO', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecApiSteps,
    LegalAdvisorApiSteps,
    CaseworkerApiSteps,
    JudgeApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmallTrack1v1();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecApiSteps.RespondSmallFullDefence();
    await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence();
    await CaseworkerApiSteps.MediationUnsuccessful();
    await LegalAdvisorApiSteps.SdoSmallTrackNoSum();
    await DefendantSolicitor1SpecApiSteps.RequestForReconsideration();
    await JudgeApiSteps.DecisionOnReconsiderationRequestSdo();
  });
});
