const config = require('../../../config.js');
const {addUserCaseMapping} = require('../../../api/caseRoleAssignmentHelper');
const {unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
let caseNumber;

//For last weeks date
const date = new Date();
date.setDate(date.getDate() - 7);
const lastWeekDate = date.toISOString().split('T')[0];

const breathingSpaceDetailsStandard = [
  'Standard Breathing Space',
  lastWeekDate,
  'refStandard1234'
];

Feature('Case Worker enter into BS Standard  - 1v1 - spec').tag('@civil-ccd-nightly @ui-breathing-space');

Scenario('01 1v1 spec with state as Awaiting Defendant Response', async ({api_spec_small, LRspec}) => {
  await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
  caseNumber = await api_spec_small.getCaseId();
  await LRspec.setCaseId(caseNumber);
  addUserCaseMapping(caseNumber, config.applicantSolicitorUser);
}).retry(2);

Scenario('02 CaseWorker enter into BS Standard', async ({LRspec}) => {
  await LRspec.login(config.ctscAdminUser);
  await LRspec.enterIntoBS(breathingSpaceDetailsStandard);
});

AfterSuite(async ({api_spec_small}) => {
  await api_spec_small.cleanUp();
  await unAssignAllUsers();
});
