const config = require('../../../config.js');
const {unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');

Feature('1v1 - Unspec create claim @e2e-hearings @non-prod-e2e-ft');

// Skipped until hearings tabs is available on preview
Scenario.skip('Listing officer access the hearings tab', async ({I, api}) => {

  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
  let caseId = await api.getCaseId();
  await I.login(config.hearingCenterAdminWithRegionId1);
  await I.navigateToCaseDetails(caseId);
  await I.accessHearingsTab(caseId);
});

AfterSuite(async () => {
  await unAssignAllUsers();
});


