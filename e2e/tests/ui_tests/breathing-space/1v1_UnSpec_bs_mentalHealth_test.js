const config = require('../../../config.js');
const {unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');

const mpScenario = 'ONE_V_ONE';

// For today's date
const today = new Date().toISOString().split('T')[0];

const breathingSpaceDetailsMentalHealth = [
  'Mental Health Crises Moratorium',
  today,
  'refMental1234'
];

let caseId;

Feature('Enter into BS Mental Health  - 1v1 - UnSpec').tag('@civil-ccd-nightly @ui-breathing-space');

Scenario('01 1v1 UnSpec with state as Awaiting Defendant Response', async ({api}) => {
  caseId = await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
}).retry(2);

Scenario('02 Applicant solicitor enter into BS Mental Health', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.enterIntoBS(breathingSpaceDetailsMentalHealth, caseId);
});

AfterSuite(async () => {
  await unAssignAllUsers();
});
