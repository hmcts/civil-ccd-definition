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

Scenario('Applicant solicitor creates 1v2 specified claim both defendants same LR for small claims @create-claim-spec', async ({I}) => {
  console.log('Applicant solicitor creates 1v2 specified claim both defendants Same LR for small claims @create-claim-spec');
  await I.login(config.applicantSolicitorUser);
  await I.createCaseSpec1v2('organisation', null, 'company', 'company',false, true, 1000);
  caseNumber = await I.grabCaseNumber();
  await I.see(`Case ${caseNumber} has been created.`);
}).retry(3);

Scenario('Defendant solicitor acknowledges claim-spec', async ({I}) => {
  console.log('Defendant solicitor acknowledges claim-spec: ' + caseId());
  await assignCaseToDefendantLRspec(caseId());
  await I.login(config.defendantSolicitorUser);
  await I.acknowledgeClaimSpec();
  await I.see(caseEventMessage('Acknowledgement of Service'));
}).retry(3);
