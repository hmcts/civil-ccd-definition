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
      JudgeSteps,
      DefendantSolicitor2Steps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimInter1v2DS();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.RespondInterFullDefence1v2DS();
      await DefendantSolicitor2ApiSteps.RespondInterFullDefence1v2DS();
      await ClaimantSolicitorApiSteps.RespondInterProceed1v2DS();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.GenerateDirectionsOrderInter();
      await DefendantSolicitor2Steps.Login();
      await DefendantSolicitor2Steps.EvidenceUploadBundle();
    });
  },
);
