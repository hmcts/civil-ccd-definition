const config = require('../../config.js');
const {waitForFinishedBusinessProcess} = require('../../api/testingSupport');
let caseNumber;
let caseId;
const caseEventMessage = eventName => `Case ${caseId} has been updated with event: ${eventName}`;

Feature('General Application creation @ga-spec');

Scenario('Create case for @ga', async ({api}) => {
  caseNumber = await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  console.log('Case created for general application: ' + caseNumber);
});

Scenario('Applicant solicitor creates Strike out general application @ga', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.navigateToCaseDetails(caseNumber);
  caseId = await I.grabCaseNumber();
  await I.makeAnApplication('single', caseNumber, 'no');
  console.log('General Application created: ' + caseNumber);
  await I.see(caseId);
  await waitForFinishedBusinessProcess(caseNumber);
  I.seeInCurrentUrl('INITIATE_GENERAL_APPLICATION/confirm');
  await I.click('Close and Return to case details');
  await I.see(caseEventMessage('Make an application'));
}).retry(3);

Scenario('Applicant solicitor creates Multiple general applications @ga', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.navigateToCaseDetails(caseNumber);
  caseId = await I.grabCaseNumber();
  await I.makeAnApplication('multiple', caseNumber, 'yes');
  console.log('General Application created: ' + caseNumber);
  await I.see(caseId);
  await waitForFinishedBusinessProcess(caseNumber);
  await I.click('Close and Return to case details');
  await I.see(caseEventMessage('Make an application'));
}).retry(3);
