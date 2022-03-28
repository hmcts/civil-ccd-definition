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

Feature('Multi Party Claim creation 2v1 @e2e-tests-spec');

Scenario.skip('Applicant solicitor creates 2v1 specified claim with 2 organisation vs 1 company for fast-track claims', async ({I}) => {
  console.log('Applicant solicitor creates 2v1 specified claim with 2 organisation vs 1 company for fast-track claims');
  await I.login(config.applicantSolicitorUser);
  await I.createCaseSpec2v1('organisation', 'organisation', 'company', null, false, 18000);
  caseNumber = await I.grabCaseNumber();
  await I.see(`Case ${caseNumber} has been created.`);

}).retry(3);

Scenario.skip('Defendant solicitor acknowledges claim-spec', async ({I}) => {
  console.log(' Defendant solicitor acknowledges claim-spec: ' + caseId());
  await assignCaseToDefendant(caseId());
  await I.login(config.defendantSolicitorUser);
  await I.acknowledgeClaimSpec();
  await I.see(caseEventMessage('Acknowledgement of Service'));
}).retry(3);