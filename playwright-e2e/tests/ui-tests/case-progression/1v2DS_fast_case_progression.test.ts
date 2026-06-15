import { test } from '../../../playwright-fixtures/index';

test.describe('1v2DS fast track case progression', { tag: '@civil-ccd-nightly' }, () => {
  test('1v2DS fast track case progression', async ({
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1Steps,
    DefendantSolicitor2Steps,
    ClaimantSolicitorSteps,
    JudgeSteps,
    HearingCenterAdminSteps,
  }) => {
    await ClaimantSolicitorApiSteps.CreateClaimFastTrack1v2DS();
    await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    await ClaimantSolicitorApiSteps.AmendClaimDocuments();
    await ClaimantSolicitorApiSteps.NotifyClaim();
    await ClaimantSolicitorApiSteps.NotifyClaimDetails();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
    await DefendantSolicitor1Steps.Login();
    await DefendantSolicitor1Steps.RespondFastTrackFullDefence1v2DS();
    await DefendantSolicitor2Steps.Login();
    await DefendantSolicitor2Steps.RespondFastTrackFullDefence1v2DS();
    await ClaimantSolicitorSteps.Login();
    await ClaimantSolicitorSteps.RespondFastTrackIntentToProceed1v2DS();
    await JudgeSteps.Login();
    await JudgeSteps.SdoFastTrack();
    await ClaimantSolicitorSteps.Login();
    await ClaimantSolicitorSteps.EvidenceUploadFastTrack();
    await DefendantSolicitor1Steps.Login();
    await DefendantSolicitor1Steps.EvidenceUploadFastTrack();
    await HearingCenterAdminSteps.LoginRegion1();
    await HearingCenterAdminSteps.TransferOnlineCase();
  });
});
