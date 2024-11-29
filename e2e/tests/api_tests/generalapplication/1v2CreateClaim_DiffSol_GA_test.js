const config = require('../../../config.js');
const {addUserCaseMapping, unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';
let caseNumber;

Feature('1v2 Different Solicitors General application creation @api-unspec @api-nonprod');

Scenario('Make a general application', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  caseNumber = await api.getCaseId();
  addUserCaseMapping(caseNumber, config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.initiateGeneralApplication(caseNumber, config.applicantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
});

AfterSuite(async  () => {
  await unAssignAllUsers();
});
