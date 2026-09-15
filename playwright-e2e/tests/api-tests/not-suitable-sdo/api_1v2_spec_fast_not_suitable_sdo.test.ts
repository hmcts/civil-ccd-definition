import { test } from '../../../playwright-fixtures/index';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  'Transfer Online Case 1v2 API test - fast claim - spec',
  { tag: ['@civil-service-nightly'] },
  async () => {
    test('Transfer Online Spec claim 1v2 - not suitable SDO - Transfer Case', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      CaseworkerApiSteps,
      DefendantSolicitor1SpecApiSteps,
      JudgeApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v2SS();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      });
      await ClaimantSolicitorSpecApiSteps.RespondFastRejectFullDefence1v2SS();
      await JudgeApiSteps.NotSuitableSdoChangeLocation();
      await CaseworkerApiSteps.TransferOnlineCase();
    });

    test(
      'Transfer Online Spec claim 1v2 - not suitable SDO - Other reasons',
      { tag: '@api-not-suitable-sdo' },
      async ({
        ClaimantSolicitorSpecApiSteps,
        CaseRoleAssignmentApiSteps,
        DefendantSolicitor1SpecApiSteps,
        JudgeApiSteps,
      }) => {
        await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v2SS();
        await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
        await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
        await DefendantSolicitor1SpecApiSteps.DefendantResponse({
          claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
        });
        await ClaimantSolicitorSpecApiSteps.RespondFastRejectFullDefence1v2SS();
        await JudgeApiSteps.NotSuitableSdoOther();
      },
    );
  },
);
