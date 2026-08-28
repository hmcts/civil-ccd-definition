import { test } from '../../../playwright-fixtures/index';

test.describe('CCD 1v2 Spec fast hearings API test',  async () => {
  test('1v2 fast claim full defence', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecApiSteps,
    HearingCenterAdminApiSteps,
    JudgeApiSteps
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v2SS();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecApiSteps.RespondFastFullDefence1v2SS();
    await ClaimantSolicitorSpecApiSteps.RespondFastRejectFullDefence1v2SS();
    await HearingCenterAdminApiSteps.CreateCaseFlagCaseLevel();
    await HearingCenterAdminApiSteps.CreateCaseFlagClaimant1();
    await JudgeApiSteps.SdoFast();
    await HearingCenterAdminApiSteps.GenerateHearingsPayloadSpec();

  });
});
