import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v2DS intermediate track journey',
  {
    tag: ['@civil-ccd-nightly'],
  },
  () => {
    test('1v2DS intermediate track', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      DefendantSolicitor2ApiSteps,
      HearingCenterAdminApiSteps,
      JudgeApiSteps,
      JudgeSteps,
      DefendantSolicitor2Steps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimIntermediate1v2DS();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.RespondIntermediateFullDefence1v2DS();
      await DefendantSolicitor2ApiSteps.RespondIntermediateFullDefence1v2DS();
      await ClaimantSolicitorApiSteps.RespondIntermediateProceed1v2DS();
      await JudgeApiSteps.GenerateDirectionsOrderIntermediate();
      await HearingCenterAdminApiSteps.ScheduleHearingFastTrial();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.GenerateDirectionsOrderMulti();
      await DefendantSolicitor2Steps.Login();
      await DefendantSolicitor2Steps.EvidenceUploadFast();
    });
  },
);
