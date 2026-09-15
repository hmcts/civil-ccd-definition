const config = require('../../../config.js');
const {unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');

const mpScenario = 'ONE_V_ONE';

//For last weeks date
const date = new Date();
date.setDate(date.getDate() - 7);
const lastWeekDate = date.toISOString().split('T')[0];

const breathingSpaceDetailsStandard = [
  'Standard Breathing Space',
  lastWeekDate,
  'refStandard1234'
];

let caseId;

Feature('Case Worker enter into BS Standard  - 1v1 - UnSpec').tag('@civil-ccd-nightly @ui-breathing-space');

Scenario('01 1v1 UnSpec with state as Awaiting Claimant Intention', async ({api}) => {
  caseId = await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario);
}).retry(2);

Scenario('02 Case Worker enter into BS Standard', async ({I}) => {
  await I.login(config.ctscAdminUser);
  await I.enterIntoBS(breathingSpaceDetailsStandard, caseId);
});

AfterSuite(async () => {
  await unAssignAllUsers();
});
