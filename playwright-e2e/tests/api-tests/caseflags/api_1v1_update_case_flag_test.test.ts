import { test } from '../../../playwright-fixtures/index';

async function run1v1BaseJourney({
                                   ClaimantSolicitorApiSteps,
                                   CaseRoleAssignmentApiSteps,
                                   HearingCenterAdminSteps,
                                 }) {
  await ClaimantSolicitorApiSteps.CreateClaimFast1v1();
  await ClaimantSolicitorApiSteps.MakePaymentForClaimIssue();
  await ClaimantSolicitorApiSteps.NotifyClaim();
  await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
  await ClaimantSolicitorApiSteps.NotifyClaimDetails();
  await HearingCenterAdminSteps.LoginRegion1();
}

test.describe('1v1 update case flags api journey', { tag: '@civil-service-nightly' }, () => {

  test('1v1 update case level flag', async ({
                                              ClaimantSolicitorApiSteps,
                                              CaseRoleAssignmentApiSteps,
                                              HearingCenterAdminApiSteps,
                                              HearingCenterAdminSteps,
                                            }) => {
    await run1v1BaseJourney({
      ClaimantSolicitorApiSteps,
      CaseRoleAssignmentApiSteps,
      HearingCenterAdminSteps,
    });

    await HearingCenterAdminApiSteps.CreateCaseFlags();
    await HearingCenterAdminApiSteps.UpdateCaseLevelComplexCaseFlag();
  });
});
