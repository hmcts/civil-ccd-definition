const config = require('../config.js');
const {waitForFinishedBusinessProcess, assignCaseToDefendant} = require('../api/testingSupport');

const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

const claimant1 = {
  litigantInPerson: true
};

const respondent1 = {
  represented: true,
  representativeRegistered: true,
  representativeOrgNumber: 2
};

let caseNumber;

Feature('1v1 - Claim Journey @e2e-multiparty');

Scenario('Applicant solicitor creates claim @create-claim', async ({I}) => {
  console.log(config.url)
  await I.login(config.applicantSolicitorUser);
  await I.createCase(claimant1, null, respondent1, null);
  caseNumber = await I.grabCaseNumber();
  await I.see(`Case ${caseNumber} has been created.`);
}).retry(3);

Scenario('Applicant solicitor notifies defendant solicitor of claim', async ({I}) => {
  await I.notifyClaim();
  await I.see(caseEventMessage('Notify claim'));
  await assignCaseToDefendant(caseId());
}).retry(3);

Scenario('Applicant solicitor notifies defendant solicitor of claim details', async ({I}) => {
  console.log('STARTED NOTIFY CLAIM DETAILS SCENARIO');
  await I.notifyClaimDetails();
  await I.see(caseEventMessage('Notify claim details'));
  await I.click('Sign out');
  console.log('ENDED NOTIFY CLAIM DETAILS SCENARIO');
}).retry(3);

Scenario('Defendant solicitor acknowledges claim', async ({I}) => {
  console.log('STARTED ACK CLAIM SCENARIO');
  await I.login(config.defendantSolicitorUser);
  await I.acknowledgeClaim('fullDefence');
  await I.see(caseEventMessage('Acknowledge claim'));
  await I.click('Sign out');
  console.log('ENDED ACK CLAIM SCENARIO');
}).retry(3);

Scenario('Defendant solicitor requests deadline extension', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.informAgreedExtensionDate(1);
  await I.see(caseEventMessage('Inform agreed extension date'));
}).retry(3);

Scenario('Defendant solicitor adds defendant litigation friend', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.addDefendantLitigationFriend();
  await I.see(caseEventMessage('Add litigation friend'));
});

Scenario('Defendant solicitor responds to claim', async ({I}) => {
  await I.respondToClaim({defendant1Response: 'fullDefence'});
  await I.see(caseEventMessage('Respond to claim'));
  await I.click('Sign out');
}).retry(3);

Scenario('Claimant solicitor responds to defence', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.respondToDefence();
  await I.see(caseEventMessage('View and respond to defence'));
  await waitForFinishedBusinessProcess(caseId());
}).retry(3);
