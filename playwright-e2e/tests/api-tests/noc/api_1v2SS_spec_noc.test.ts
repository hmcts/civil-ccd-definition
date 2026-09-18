import { test } from '../../../playwright-fixtures/index';
import ClaimType from '../../../constants/cases/claim-type';

test.describe(
  '1v2SS spec notice of change api journey',
  { tag: ['@civil-service-nightly', '@api-noc'] },
  async () => {
    test('1vSS spec notice of change', async ({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      DefendantSolicitor1SpecApiSteps,
      DefendantSolicitor2SpecApiSteps,
    }) => {
      await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v2SS();
      await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await DefendantSolicitor2SpecApiSteps.NoticeOfChange();
      await DefendantSolicitor1SpecApiSteps.DefendantResponse({
        claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      });
      await DefendantSolicitor2SpecApiSteps.DefendantResponse({
        claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      });
    });
  },
);
