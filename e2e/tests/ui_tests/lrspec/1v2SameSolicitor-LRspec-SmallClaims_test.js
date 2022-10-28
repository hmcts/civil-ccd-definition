const config = require('../../../config.js');
const {assignCaseToLRSpecDefendant} = require('../../../api/testingSupport');
const {addUserCaseMapping, unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');

// Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
//const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

const respondent1 = {
  represented: true,
  representativeRegistered: true,
  representativeOrgNumber: 2
};
const respondent2 = {
  represented: true,
  sameLegalRepresentativeAsRespondent1: true,
  representativeOrgNumber: 2
};

let caseNumber;

Feature('Claim creation 1v2 Same Solicitor with Small claims @e2e-tests-spec');

Scenario('Applicant solicitor creates 1v2 specified claim both defendants same LR for small claims @create-claim-spec', async ({LRspec}) => {
  console.log('Applicant solicitor creates 1v2 specified claim both defendants Same LR for small claims @create-claim-spec');
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.createCaseSpecified('1v2 specified claim both defendants same', 'organisation', null, respondent1, respondent2, 1000);
  caseNumber = await LRspec.grabCaseNumber();
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await LRspec.see(`Case ${caseNumber} has been created.`);
  addUserCaseMapping(caseId(), config.applicantSolicitorUser);
}).retry(3);

Scenario('1v2 Respond To Claim - Defendants solicitor rejects claim for defendant', async ({LRspec}) => {
  console.log('1v2 Defendant solicitor reject the specified claim');
  await assignCaseToLRSpecDefendant(caseId());
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.respondToClaimFullDefence({
    twoDefendants: true,
    defendant1Response: 'fullDefence',
    claimType: 'small',
    defenceType: 'dispute'
  });
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await LRspec.see(caseEventMessage('Respond to claim'));
  await LRspec.click('Sign out');
}).retry(3);

Scenario('1v2 same solicitor responds to defence - claimant Intention to proceed', async ({LRspec}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.respondToDefence({mpScenario: 'ONE_V_ONE', claimType: 'small'});
  await LRspec.click('Sign out');
}).retry(3);

AfterSuite(async  () => {
  await unAssignAllUsers();
});