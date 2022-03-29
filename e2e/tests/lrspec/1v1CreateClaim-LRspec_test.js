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

Feature('Claim creation 1v1 @e2e-tests-spec');

Scenario('Applicant solicitor creates 1v1 specified claim both defendants same LR for small claims @create-claim-spec', async ({I}) => {
  console.log('Applicant solicitor creates 1v1 specified claim both defendants Same LR for small claims @create-claim-spec');
  await I.login(config.applicantSolicitorUser);
  await I.createCaseSpecified('organisation', null , 'company', null  ,false, 1500);
  caseNumber = await I.grabCaseNumber();
  await I.see(`Case ${caseNumber} has been created.`);
}).retry(3);




