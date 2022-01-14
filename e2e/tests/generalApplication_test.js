const config = require('../config.js');
/*const {waitForFinishedBusinessProcess, assignCaseToDefendant} = require('../api/testingSupport');

const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;*/

let caseNumber;

Feature('General Application creation @ga-e2e-tests');

Scenario('Applicant solicitor creates Strike out general application @ga', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.createCase();
  caseNumber = await I.grabCaseNumber();
  await I.see(`Case ${caseNumber} has been created.`);
  await I.makeAnApplication('strikeOut');
  pause();
}).retry(2);
