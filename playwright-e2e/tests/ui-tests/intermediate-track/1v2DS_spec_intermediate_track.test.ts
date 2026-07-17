import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v2DS spec intermediate track journey',
  {
    tag: ['@civil-ccd-nightly'],
  },
  () => {
    test('1v2DS spec intermediate track', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      DefendantSolicitor2SpecApiSteps,
      JudgeApiSteps,
      HearingCenterAdminApiSteps,
      DefendantSolicitor2SpecSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimIntermediate1v2DS();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await DefendantSolicitor1SpecApiSteps.RespondIntermediateFullDefence();
      await DefendantSolicitor2SpecApiSteps.RespondIntermediateFullDefence();
      await ClaimantSolicitorSpecApiSteps.RespondIntermediateProceed1v2DS();
      await JudgeApiSteps.GenerateDirectionsOrderIntermediate();
      await HearingCenterAdminApiSteps.ScheduleHearingFastTrial();
      await HearingCenterAdminApiSteps.AmendHearingDueDate();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForHearingFee();
      await JudgeApiSteps.GenerateDirectionsOrderFreeFormOrder();
      await DefendantSolicitor2SpecSteps.Login();
      await DefendantSolicitor2SpecSteps.EvidenceUploadFast();
    });
  },
);
