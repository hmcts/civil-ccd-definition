import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';

test.describe(
  '1v2DS spec api multi track journey',
  { tag: ['@civil-service-nightly', '@api-multi-track'] },
  async () => {
    test('1v2DS spec full defence multi claim', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      DefendantSolicitor2SpecApiSteps,
      JudgeApiSteps,
      HearingCenterAdminApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimMulti1v2DS();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.MULTI_CLAIM,
      });
      await DefendantSolicitor2SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.MULTI_CLAIM,
      });
      await ClaimantSolicitorSpecApiSteps.RespondMultiRejectFullDefence1v2DS();
      await JudgeApiSteps.GenerateDirectionsOrderMulti();
      await ClaimantSolicitorSpecApiSteps.EvidenceUploadFast();
      await HearingCenterAdminApiSteps.ScheduleHearingFastTrial();
    });
  },
);
