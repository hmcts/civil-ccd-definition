const config = require('../../config.js');
const {waitForFinishedBusinessProcess} = require('../../api/testingSupport');
const caseEventMessage = eventName => `Case ${caseId} has been updated with event: ${eventName}`;
let caseNumber;
let caseId;
let appTypes = ['Strike out', 'Stay the claim', 'Extend time', 'Summary judgement'];

Feature('General Application creation @ga-spec');

Scenario('Create case for @ga', async ({api}) => {
  caseNumber = await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  console.log('Case created for general application: ' + caseNumber);
});

Scenario('Applicant solicitor creates Single general application @ga', async ({I}) => {
  let app = appTypes.slice(0, 1);
  await I.login(config.applicantSolicitorUser);
  await I.navigateToCaseDetails(caseNumber);
  caseId = await I.grabCaseNumber();
  await I.makeAnApplication(app, caseNumber, 'no');
  await verifyGeneralApplication(I, caseId, app);
}).retry(2);

Scenario('Applicant solicitor creates Multiple general applications @ga', async ({I}) => {
  let apps = appTypes.slice(0, 3);
  await I.login(config.applicantSolicitorUser);
  await I.navigateToCaseDetails(caseNumber);
  caseId = await I.grabCaseNumber();
  await I.makeAnApplication(apps, caseNumber, 'yes');
  await verifyGeneralApplication(I, caseId, apps);
}).retry(2);

const verifyGeneralApplication = async (I, caseId, appType) => {
  console.log('General Application created: ' + caseNumber);
  await I.see(caseId);
  await waitForFinishedBusinessProcess(caseNumber);
  await I.verifyGAConfirmationPage(appType);
  await I.click('Close and Return to case details');
  await I.see(caseEventMessage('Make an application'));
};
