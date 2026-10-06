const config = require('../../../config.js');
const {addUserCaseMapping} = require('../../../api/caseRoleAssignmentHelper');
const {unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
let caseNumber;

const legalAdvisorUser = config.tribunalCaseworkerWithRegionId4;

// For today's date
const today = new Date().toISOString().split('T')[0];

//For last weeks date
const date = new Date();
date.setDate(date.getDate() - 7);
const lastWeekDate = date.toISOString().split('T')[0];

//For next weeks date
const date1 = new Date();
date1.setDate(date1.getDate() + 7);
const nextWeekDate = date1.toISOString().split('T')[0];

const breathingSpaceDetailsMentalHealth = [
  'Mental Health Crises Moratorium',
  lastWeekDate,
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

Feature('1v2 Spec claim Enter into BS twice and then Exit  - 1v2 - spec').tag('@civil-ccd-nightly @ui-breathing-space');

Scenario('01 1v2 spec with state as Case Progression', async ({api_spec, LRspec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO');
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO', 'JUDICIAL_REFERRAL');
  await LRspec.wait(10);

  console.log('Create SDO');
  await api_spec.createSDO(legalAdvisorUser, 'CREATE_SMALL');

  caseNumber = await api_spec.getCaseId();
  await LRspec.setCaseId(caseNumber);
  addUserCaseMapping(caseNumber, config.applicantSolicitorUser);
}).retry(2);

Scenario('02 Enter into BS Mental Health for 1st Defendant', async ({LRspec}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.enterIntoBS(breathingSpaceDetailsMentalHealth);
});

Scenario('03 Lift BS Mental Health for 1st Defendant', async ({LRspec}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.liftBS(liftBreathingSpaceDetails);
});

Scenario('04 Enter into Standard BS for 2nd Defendant', async ({LRspec}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.enterIntoBS(breathingSpaceDetailsStandard);
});

Scenario('05 Lift BS Standard for 2nd Defendant', async ({LRspec}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.liftBS(liftBreathingSpaceDetails);
});

AfterSuite(async ({api_spec_small}) => {
  await api_spec_small.cleanUp();
  await unAssignAllUsers();
});
