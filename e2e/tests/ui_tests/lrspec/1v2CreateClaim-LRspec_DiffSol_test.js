const config = require('../../../config.js');
const {assignCaseRoleToUser} = require('../../../api/caseRoleAssignmentHelper');
const {assignCaseToLRSpecDefendant} = require('../../../api/testingSupport');


const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

const respondent1 = {
  represented: true,
  representativeRegistered: true,
  representativeOrgNumber: 2
};
const respondent2 = {
  represented: true,
  sameLegalRepresentativeAsRespondent1: false,
  representativeOrgNumber: 3
};

let caseNumber;

Feature('Claim creation 1v2 Diff Solicitor with Small claims @e2e-tests-spec');

Scenario('Applicant solicitor creates 1v2 specified claim defendant Different LRs for fast claims @create-claim-spec', async ({LRspec}) => {
  console.log('AApplicant solicitor creates 1v2 specified claim defendant Different LRs for fast claims @create-claim-spec');
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.createCaseSpecified('1v2 Different LRs fast claim','organisation', null, respondent1, respondent2, 15450);
  caseNumber = await LRspec.grabCaseNumber();
  await LRspec.see(`Case ${caseNumber} has been created.`);

}).retry(3);

Scenario('1v2 Respond To Claim - Defendants solicitor rejects claim for defendant', async ({LRspec}) => {

  await assignCaseToLRSpecDefendant(caseId());
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.respondToClaimFullDefence({
    defendant1Response: 'fullDefence',
    claimType: 'fast',
    defenceType: 'dispute'
  });
  await LRspec.see(caseEventMessage('Respond to claim'));
  await LRspec.click('Sign out');
}).retry(3);

Scenario('1v2 Respond To Claim - Defendants solicitor rejects claim for defendant', async ({LRspec}) => {
  await assignCaseToLRSpecDefendant(caseId());
  await LRspec.login(config.secondDefendantSolicitorUser);
  await LRspec.respondToClaimFullDefence({
    defendant1Response: 'fullDefence',
    claimType: 'fast',
    defenceType: 'dispute'
  });
  await LRspec.see(caseEventMessage('Respond to claim'));
  await LRspec.click('Sign out');
}).retry(3);

