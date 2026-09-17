import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v2SS default judgement api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v2SS default judgement api', async ({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      JudgeApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaim({
        claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
        claimTrack: ClaimTrack.FAST_CLAIM,
      });
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await ClaimantSolicitorApiSteps.AmendRespondent1ResponseDeadline();
      await ClaimantSolicitorApiSteps.DefaultJudgement1v2SS();
      await JudgeApiSteps.SdoDJDisposal();
    });
  },
);
