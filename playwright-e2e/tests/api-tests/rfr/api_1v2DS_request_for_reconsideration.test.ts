import { test } from '../../../playwright-fixtures/index';

test.describe('Request for reconsideration - 1v2DS - spec', { tag: '@civil-service-nightly' }, async () => {
  test('1v2 spec request for reconsideration by defendant 2 for create general order', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecApiSteps,
    DefendantSolicitor2SpecApiSteps,
    LegalAdvisorApiSteps,
    JudgeApiSteps,
    CaseworkerApiSteps
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimSmallTrack1v2DS();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
    await DefendantSolicitor1SpecApiSteps.RespondSmallFullDefence1v2DS();
    await DefendantSolicitor2SpecApiSteps.RespondSmallFullDefence();
    await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence1v2DS();
    await CaseworkerApiSteps.MediationUnsuccessful();
    await LegalAdvisorApiSteps.SdoSmallTrackNoSum();
    await DefendantSolicitor2SpecApiSteps.RequestForReconsideration();
    await JudgeApiSteps.DecisionOnReconsiderationRequestAmend();
  });
});
