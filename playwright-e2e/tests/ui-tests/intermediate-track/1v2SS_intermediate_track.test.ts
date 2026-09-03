import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v2SS intermediate track journey',
  {
    tag: ['@civil-ccd-nightly'],
  },
  () => {
    test('1v2SS intermediate track', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      ClaimantSolicitorSteps,
      DefendantSolicitor1Steps,
      JudgeSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimInter1v2SS();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.RespondInterFullDefence1v2SS();
      await ClaimantSolicitorApiSteps.RespondInterProceed1v2SS();
      await JudgeSteps.LoginRegion1();
      await JudgeSteps.GenerateDirectionsOrderInter();
      await ClaimantSolicitorSteps.Login();
      await ClaimantSolicitorSteps.EvidenceUploadBundle();
      await DefendantSolicitor1Steps.Login();
      await DefendantSolicitor1Steps.EvidenceUploadBundle1v2SS();
    });
  },
);
