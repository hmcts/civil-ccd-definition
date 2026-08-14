import { test } from '../../../playwright-fixtures/index';

test.describe('1v2SS spec multi track journey', { tag: '@civil-ccd-nightly' }, async () => {
  test('1v2SS spec multi track journey', async ({
    ClaimantSolicitorSpecSteps,
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecSteps,
    JudgeSteps,
    HearingCenterAdminApiSteps,
  }) => {
    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.CreateClaimMulti1v2SS();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await DefendantSolicitor1SpecSteps.Login();
    await DefendantSolicitor1SpecSteps.RespondMultiFullDefence1v2SS();
    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.RespondMultiProceed1v2SS();
    await JudgeSteps.LoginRegion1();
    await JudgeSteps.GenerateDirectionsOrderMulti();
    await HearingCenterAdminApiSteps.ScheduleHearingFastTrial();
    await HearingCenterAdminApiSteps.AmendHearingDueDate();
    await ClaimantSolicitorSpecApiSteps.MakePaymentForHearingFee();
    await ClaimantSolicitorSpecSteps.Login();
    await ClaimantSolicitorSpecSteps.EvidenceUploadBundle();
    await DefendantSolicitor1SpecSteps.Login();
    await DefendantSolicitor1SpecSteps.EvidenceUploadBundle1v2SS();
  });
});
