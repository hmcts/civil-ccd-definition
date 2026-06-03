import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 fast case progression api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v1 fast case progression', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1ApiSteps,
      JudgeLAApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimFastTrack1v1();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.AmendClaimDocuments();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.RespondFastTrackFullDefence();
      await ClaimantSolicitorApiSteps.RespondFastTrackFullDefence();
      await JudgeLAApiSteps.CreateSdoFastTrack();
    });
  },
);
