const config = require('../../config.js');
const {assignCaseToDefendantLRspec} = require('../../api/testingSupport');
const claimant1 = {
  litigantInPerson: false
};
const respondent1 = {
  represented: false
};
const respondent2 = {
  sameLegalRepresentativeAsRespondent1: false,
  represented: true,
  representativeRegistered: true,
  representativeOrgNumber: 2
};
const {assignCaseToDefendant} = require('../../api/testingSupport');

const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

let caseNumber;

Feature('Multi Party Claim creation 1v2 @e2e-tests-spec');

Scenario.skip('Fast Track claim -> Defendant solicitor responds to claim amount £ 15000) -> Defends all of the claim -> hasPaid  10000 less than claimed amount ', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.respondToClaimSpecPartAdmit1('fast','partAdmission','no','immediately');
  await I.see(caseEventMessage('Respond to claim'));
}).retry(3);

