const config = require('../../config.js');
const {waitForFinishedBusinessProcess} = require('../../api/testingSupport');
const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

let caseNumber;

Feature('General Application creation @ga-e2e-tests');

Scenario('Applicant solicitor creates Strike out general application @ga', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.createCase();
  caseNumber = await I.grabCaseNumber();
  await I.see(`Case ${caseNumber} has been created.`);
  await I.makeAnApplication('strikeOut');
  await I.see(caseNumber);
  await waitForFinishedBusinessProcess(caseId());
  await I.click('Close and Return to case details');
  await I.see(caseEventMessage('Make an application'));
}).retry(1);
