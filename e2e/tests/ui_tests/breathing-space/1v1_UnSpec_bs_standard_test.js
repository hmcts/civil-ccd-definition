const config = require('../../../config.js');
const {unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');

const mpScenario = 'ONE_V_ONE';

// For today's date
const today = new Date().toISOString().split('T')[0];

//For last weeks date
const date = new Date();
date.setDate(date.getDate() - 7);
const lastWeekDate = date.toISOString().split('T')[0];

const breathingSpaceDetailsStandard = [
  'Standard Breathing Space',
  lastWeekDate,
  'refStandard1234'
];

const liftBreathingSpaceDetails = [
  today,
  'test reason'
];

let caseId;

Feature('Enter into BS Standard and then Exit  - 1v1 - UnSpec').tag('@civil-ccd-nightly @ui-breathing-space');

Scenario('01 1v1 UnSpec with state as Awaiting Claimant Intention', async ({api}) => {
  caseId = await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario);
}).retry(2);

Scenario('02 Applicant solicitor enter into BS Standard', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.enterIntoBS(breathingSpaceDetailsStandard, caseId);
});

Scenario('03 Lift BS Standard', async ({I}) => {
  const futureExit = false;
  await I.login(config.applicantSolicitorUser);
  await I.liftBS(liftBreathingSpaceDetails, caseId, futureExit);
});

AfterSuite(async () => {
  await unAssignAllUsers();
});
