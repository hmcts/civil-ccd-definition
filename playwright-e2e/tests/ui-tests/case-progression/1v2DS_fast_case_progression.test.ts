import { test } from '../../../playwright-fixtures/index';

test.describe('1v2DS fast track case progression', { tag: '@civil-ccd-nightly' }, () => {
  test.only('1v2DS fast track case progression', async ({
    ClaimantSolicitorApiSteps,
    CaseRoleAssignmentApiSteps,
    DefendantSolicitor1Steps,
    DefendantSolicitor2Steps,
    ClaimantSolicitorSteps,
    JudgeSteps,
  }) => {
    // await ClaimantSolicitorApiSteps.CreateClaimFastTrack1v2DS();
    // await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
    // await ClaimantSolicitorApiSteps.AmendClaimDocuments();
    // await ClaimantSolicitorApiSteps.NotifyClaim();
    // await ClaimantSolicitorApiSteps.NotifyClaimDetails();
    // await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
    // await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
    // await DefendantSolicitor1Steps.Login();
    // await DefendantSolicitor1Steps.RespondFastTrackFullDefence1v2DS();
    // await DefendantSolicitor2Steps.Login();
    // await DefendantSolicitor2Steps.RespondFastTrackFullDefence1v2DS();
    // await ClaimantSolicitorSteps.Login();
    // await ClaimantSolicitorSteps.RespondFastTrackIntentToProceed1v2DS();
    // await JudgeSteps.Login();
    // await JudgeSteps.SdoFastTrack();
    await ClaimantSolicitorSteps.Login();
    await ClaimantSolicitorSteps.EvidenceUploadApplicant();
    await DefendantSolicitor1Steps.Login();
    await DefendantSolicitor1Steps.EvidenceUploadRespondent();
  });
});

// API Create Unspecified 1v2DS Fast Claim (Step already complete)
// API Make Payment (Step already complete)
// API Assign case to defendant 1 (Step already complete)
// API Assign case to defendant 2 (Step already complete)
// Respond as defendant 1 full defence (Step already complete)
// Respond as defendant 2 full defence (Step already complete)
// Respond as claimant intent to proceed (Step already complete)
// Judge triggers SDO.
// Upload evidence as claimant solicitor
// Upload evidence as defendant solicitor
// Transfer case online
