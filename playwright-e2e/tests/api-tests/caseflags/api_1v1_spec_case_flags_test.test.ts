import { test } from '../../../playwright-fixtures/index';

async function run1v1SpecBaseJourney({
ClaimantSolicitorSpecApiSteps,
CaseRoleAssignmentApiSteps,
HearingCenterAdminSteps,
}) {
  await ClaimantSolicitorSpecApiSteps.CreateClaimFast1v1();
  await ClaimantSolicitorSpecApiSteps.MakePaymentForClaimIssue();
  await CaseRoleAssignmentApiSteps.AssignCaseRoleToDS1();
  await HearingCenterAdminSteps.LoginRegion1();}

test.describe('1v1 spec case flags api journey', { tag: '@civil-service-nightly' }, () => {

test('1v1 spec party case flag api journey', async ({
CaseRoleAssignmentApiSteps,
HearingCenterAdminApiSteps,
HearingCenterAdminSteps,
ClaimantSolicitorSpecApiSteps
}) => {

    await run1v1SpecBaseJourney({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      HearingCenterAdminSteps,
    });
    await HearingCenterAdminApiSteps.CreateApplicant1SpecialMeasureCaseFlag();
  });

test('1v1 spec case flag api journey', async ({
CaseRoleAssignmentApiSteps,
HearingCenterAdminApiSteps,
HearingCenterAdminSteps,
ClaimantSolicitorSpecApiSteps
}) => {

    await run1v1SpecBaseJourney({
      ClaimantSolicitorSpecApiSteps,
      CaseRoleAssignmentApiSteps,
      HearingCenterAdminSteps,
    });

    await HearingCenterAdminApiSteps.CreateCaseFlags();
  });
});
