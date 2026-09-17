import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe('1v2DS spec api multi track journey', { tag: '@civil-service-nightly' }, async () => {
  test('1v2DS spec full defence multi claim', async ({
    ClaimantSolicitorSpecApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1SpecApiSteps,
    DefendantSolicitor2SpecApiSteps,
    JudgeApiSteps,
    HearingCenterAdminApiSteps,
  }) => {
    await ClaimantSolicitorSpecApiSteps.CreateClaim({
      claimTrack: ClaimTrack.MULTI_CLAIM,
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
    });
    await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
    await DefendantSolicitor1SpecApiSteps.RespondMultiFullDefence();
    await DefendantSolicitor2SpecApiSteps.RespondMultiFullDefence();
    await ClaimantSolicitorSpecApiSteps.RespondMultiRejectFullDefence1v2DS();
    await JudgeApiSteps.GenerateDirectionsOrderMulti();
    await ClaimantSolicitorSpecApiSteps.EvidenceUploadFast();
    await HearingCenterAdminApiSteps.ScheduleHearingFastTrial();
  });
});
