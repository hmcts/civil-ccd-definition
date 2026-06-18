import { test } from '../../../playwright-fixtures/index';

test.describe('2v1 fast track claim journey', { tag: '@civil-ccd-nightly' }, async () => {
  test('2v1 fast track claim journey', async ({
    ClaimantSolicitorSteps,
    DefendantSolicitor1Steps,
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
  }) => {
    await ClaimantSolicitorSteps.Login();
    await ClaimantSolicitorSteps.CreateClaimFastTrack2v1();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await ClaimantSolicitorSteps.NotifyClaim();
    await ClaimantSolicitorSteps.NotifyClaimDetails();
    await DefendantSolicitor1Steps.Login();
    await DefendantSolicitor1Steps.AcknowledgeClaimFullDefence2v1();
    await DefendantSolicitor1Steps.InformAgreedExtensionDate();
    await DefendantSolicitor1Steps.RespondFastTrackFullDefence2v1();
    await ClaimantSolicitorSteps.Login();
    await ClaimantSolicitorSteps.RespondFastTrackIntentToProceed2v1();
  });
});
