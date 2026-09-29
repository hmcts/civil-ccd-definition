import { test } from '../../../playwright-fixtures/index';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  'Request for reconsideration - 1v2DS - spec',
  { tag: ['@civil-service-nightly'] },
  async () => {
    test(
      '1v2 spec request for reconsideration by defendant 2 for create general order',
      { tag: '@api-rfr' },
      async ({
        ClaimantSolicitorSpecApiSteps,
        CaseRoleAssignmentApiSteps,
        DefendantSolicitor1SpecApiSteps,
        DefendantSolicitor2SpecApiSteps,
        LegalAdvisorApiSteps,
        JudgeApiSteps,
        CaseworkerApiSteps,
      }) => {
        await ClaimantSolicitorSpecApiSteps.CreateClaimSmall1v2DS();
        await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
        await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
        await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
        await DefendantSolicitor1SpecApiSteps.DefendantResponse({
          claimTrack: ClaimTrack.SMALL_CLAIM,
          claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
        });
        await DefendantSolicitor2SpecApiSteps.DefendantResponse({
          claimTrack: ClaimTrack.SMALL_CLAIM,
          claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
        });
        await ClaimantSolicitorSpecApiSteps.RespondSmallRejectFullDefence1v2DS();
        await CaseworkerApiSteps.MediationUnsuccessful();
        await LegalAdvisorApiSteps.SdoSmallNoSum();
        await DefendantSolicitor2SpecApiSteps.RequestForReconsideration();
        await JudgeApiSteps.DecisionOnReconsiderationRequestAmend();
      },
    );
  },
);
