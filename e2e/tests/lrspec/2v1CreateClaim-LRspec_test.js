const config = require('../../config.js');
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

Feature('Claim creation @e2e-tests-spec');

Scenario('Applicant solicitor creates 1v2 specified claim organisation-to-company @create-claim-spec', async ({I}) => {
  console.log('Applicant solicitor creates 1v2 specified claim company-to-company @create-claim-spec');
  await I.login(config.applicantSolicitorUser);
  await I.createCaseSpec1v2('organisation', null, 'company', 'company',false,1000);
  caseNumber = await I.grabCaseNumber();
  await I.see(`Case ${caseNumber} has been created.`);

}).retry(3);
