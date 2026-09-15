const config = require('../../../config.js');
const {addUserCaseMapping} = require('../../../api/caseRoleAssignmentHelper');
const {unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
let caseNumber;

// For today's date
const today = new Date().toISOString().split('T')[0];

const breathingSpaceDetailsStandard = [
  'Standard Breathing Space',
  today,
  'refStandard1234'
];

Feature('Enter into BS Standard  - 1v1 - spec').tag('@civil-ccd-nightly @ui-breathing-space');

Scenario('01 1v1 spec with state as Awaiting Claimant Intention', async ({api_spec_small, LRspec}) => {
  await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
  await api_spec_small.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE', true);
  caseNumber = await api_spec_small.getCaseId();
  await LRspec.setCaseId(caseNumber);
  addUserCaseMapping(caseNumber, config.applicantSolicitorUser);
}).retry(2);

Scenario('02 Enter into BS Standard', async ({LRspec}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.enterIntoBS(breathingSpaceDetailsStandard);
});

AfterSuite(async ({api_spec_small}) => {
  await api_spec_small.cleanUp();
  await unAssignAllUsers();
});
