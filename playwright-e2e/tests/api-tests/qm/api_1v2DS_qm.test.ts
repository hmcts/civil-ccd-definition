import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v2 different solicitor query management api journey',
  { tag: '@civil-service-nightly' },
  async () => {
    test('1v2DS full defence defendant and claimant response', async ({
      ClaimantSolicitorApiSteps,
      CtscAdminApiSteps,
      DefendantSolicitor1ApiSteps,
      DefendantSolicitor2ApiSteps,
      CaseRoleAssignmentApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimFast1v2DS();
      await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
      await ClaimantSolicitorApiSteps.NotifyClaim();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
      await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS2();
      await ClaimantSolicitorApiSteps.NotifyClaimDetails();
      await DefendantSolicitor1ApiSteps.RespondFastFullDefence();
      await DefendantSolicitor2ApiSteps.RespondFastFullDefence();
      await ClaimantSolicitorApiSteps.RespondFastProceed1v2DS();
      await ClaimantSolicitorApiSteps.RaiseLRQuery();
      await CtscAdminApiSteps.RespondToQuery();
      await ClaimantSolicitorApiSteps.FollowUpOnLRQuery();
      await DefendantSolicitor1ApiSteps.RaiseLRQuery();
      await CtscAdminApiSteps.RespondToQuery();
      await DefendantSolicitor1ApiSteps.FollowUpOnLRQuery();
      await DefendantSolicitor2ApiSteps.RaiseLRQuery();
      await CtscAdminApiSteps.RespondToQuery();
      await DefendantSolicitor2ApiSteps.FollowUpOnLRQuery();
    });
  },
);
