import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import DefendantResponseSpecType from '../../../constants/ccd-events/ccd-events/defendant-response-spec/defendant-response-spec-type';

test.describe(
  '1v1 spec api multi track journeys',
  { tag: ['@civil-service-nightly'] },
  async () => {
    test(
      '1v1 spec full defence multi claim',
      { tag: '@api-multi-track' },
      async ({
        ClaimantSolicitorSpecApiSteps,
        CaseRoleAssignmentApiSteps,
        DefendantSolicitor1SpecApiSteps,
        JudgeApiSteps,
        HearingCenterAdminApiSteps,
      }) => {
        await ClaimantSolicitorSpecApiSteps.CreateClaimMulti1v1();
        await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
        await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
        await DefendantSolicitor1SpecApiSteps.DefendantResponse({
          claimTrack: ClaimTrack.MULTI_CLAIM,
        });
        await ClaimantSolicitorSpecApiSteps.RespondMultiRejectFullDefence();
        await JudgeApiSteps.GenerateDirectionsOrderMulti();
        await ClaimantSolicitorSpecApiSteps.EvidenceUploadFast();
        await HearingCenterAdminApiSteps.ScheduleHearingFastTrial();
      },
    );

    test('1v1 spec full admission multi claim', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimMulti1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.MULTI_CLAIM,
        responseType: DefendantResponseSpecType.FULL_ADMISSION,
      });
      await ClaimantSolicitorSpecApiSteps.RespondFullAdmitImmediately();
    });

    test('1v1 spec part admission multi claim', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimMulti1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.MULTI_CLAIM,
        responseType: DefendantResponseSpecType.PART_ADMISSION,
      });
      await ClaimantSolicitorSpecApiSteps.RespondMultiRejectPartAdmit();
    });

    test('1v1 spec counter claim multi claim', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimMulti1v1();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimTrack: ClaimTrack.MULTI_CLAIM,
        responseType: DefendantResponseSpecType.COUNTER_CLAIM,
      });
    });
  },
);
