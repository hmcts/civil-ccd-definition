const config = require('../../config.js');
const {assignCaseToDefendant} = require('../../api/testingSupport');

const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

const claimant1 = {
  litigantInPerson: false
};

const claimant2 = {
  litigantInPerson: false
};

const respondent1 = {
  represented: true,
  representativeRegistered: true,
  representativeOrgNumber: 2
};

let caseNumber;


Feature('2v1 Claimant Journey @e2e-nightly @api-multiparty');


Scenario('Claimant solicitor raises a claim for 2 claimants against 1 defendant', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.createCase(claimant1, claimant2, respondent1, null);
  caseNumber = await I.grabCaseNumber();
  await I.see(`Case ${caseNumber} has been created.`);
}).retry(3);

Scenario('Claimant solicitor notifies defendant of claim', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.notifyClaim();
  await I.see(caseEventMessage('Notify claim'));
  await assignCaseToDefendant(caseId());
  await assignCaseToDefendant(caseId(), 'RESPONDENTSOLICITORTWO', config.secondDefendantSolicitorUser);
}).retry(3);

Scenario('Claimant solicitor notifies defendant solicitor of claim details', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.notifyClaimDetails();
  await I.see(caseEventMessage('Notify claim details'));
  await I.click('Sign out');
}).retry(3);