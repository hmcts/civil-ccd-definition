const config = require('../../../config.js');
const {unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
let caseId;

Feature('Cancel unissued claim  - 1v1 - spec').tag('@civil-ccd-pr @ui-cancel-unissued-claim');

Scenario('01 Create a 1v1 claim and do not make a payment', async ({api_spec}) => {
  caseId = await api_spec.createClaimWithoutPayment(config.applicantSolicitorUser, 'ONE_V_ONE');
}).retry(2);

Scenario('02 Cancel the unissued claim', async ({LRspec}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.requestForCancelUnissuedClaimForUI(caseId);
}).retry(2);

AfterSuite(async ({api_spec}) => {
  await api_spec.cleanUp();
  await unAssignAllUsers();
});
