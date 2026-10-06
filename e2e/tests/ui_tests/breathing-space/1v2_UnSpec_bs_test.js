const config = require('../../../config.js');
const {assignCaseRoleToUser, addUserCaseMapping, unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';

// For today's date
const today = new Date().toISOString().split('T')[0];

//For next weeks date
const date1 = new Date();
date1.setDate(date1.getDate() + 7);
const nextWeekDate = date1.toISOString().split('T')[0];

const breathingSpaceDetailsMentalHealth = [
  'Mental Health Crises Moratorium',
  today,
  'refMental1234'
];

const breathingSpaceDetailsStandard = [
  'Standard Breathing Space',
  today,
  'refStandard1234'
];

const liftBreathingSpaceDetails = [
  nextWeekDate,
  'test reason'
];

let caseId;
let validFastTrackDirectionsTask;

if (config.runWAApiTest) {
  validFastTrackDirectionsTask = require('../../../../wa/tasks/fastTrackDirectionsTask.js');
}

Feature('1v2 UnSpec Different Solicitors fast track - Breathing Space')
  .tag('@civil-ccd-nightly @ui-breathing-space');

Scenario('01 Claimant solicitor raises a claim against 2 defendants who have different solicitors', async ({I, api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  caseId = await api.getCaseId();
  await I.setCaseId(caseId);
  addUserCaseMapping(caseId, config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
}).retry(2);

Scenario('02 1v2 Diff   - Assign roles to defendants', async () => {
  await assignCaseRoleToUser(caseId, 'RESPONDENTSOLICITORONE', config.defendantSolicitorUser);
  await assignCaseRoleToUser(caseId,  'RESPONDENTSOLICITORTWO', config.secondDefendantSolicitorUser);
}).retry(2);

Scenario('03 Applicant solicitor enter into BS Mental Health for 1st Defendant', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.enterIntoBS(breathingSpaceDetailsMentalHealth, caseId);
});

Scenario('04 Lift BS Mental Health for 1st Defendant', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.liftBS(liftBreathingSpaceDetails, caseId);
});

Scenario('05 Applicant solicitor enter into BS Standard for 2nd Defendant', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.enterIntoBS(breathingSpaceDetailsStandard, caseId);
});

Scenario('06 Lift BS Standard for 2nd Defendant', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.liftBS(liftBreathingSpaceDetails, caseId);
});

AfterSuite(async  () => {
  await unAssignAllUsers();
});
