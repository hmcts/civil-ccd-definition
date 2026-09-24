const config = require('../../../config.js');

let mpScenario = 'ONE_V_ONE';

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

const breathingSpaceDetailsStandard = [
  'STANDARD',
  today,
  'refStandard1234'
];

const breathingSpaceDetailsMentalHealth = [
  'MENTAL_HEALTH',
  lastWeekDate,
  'refMental1234'
];

const liftBreathingSpaceDetails = [
  nextWeekDate,
  'test reason'
];

Feature('1v1 spec enter into BS and then exit').tag('@civil-service-pr @api-breathing-space');

Scenario('1v1 spec full defence and enter into Standard BS and then exit', async ({api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec.defendantResponse(config.defendantSolicitorUser);
  await api_spec.enterIntoBS(config.applicantSolicitorUser, mpScenario, breathingSpaceDetailsStandard, 'AWAITING_APPLICANT_INTENTION');
  await api_spec.liftBS(config.applicantSolicitorUser, mpScenario, liftBreathingSpaceDetails, 'AWAITING_APPLICANT_INTENTION');
});

Scenario('1v1 spec full defence and enter into Mental health BS and then exit', async ({api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec.defendantResponse(config.defendantSolicitorUser);
  await api_spec.enterIntoBS(config.applicantSolicitorUser, mpScenario, breathingSpaceDetailsMentalHealth, 'AWAITING_APPLICANT_INTENTION');
  await api_spec.liftBS(config.applicantSolicitorUser, mpScenario, liftBreathingSpaceDetails, 'AWAITING_APPLICANT_INTENTION');
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});

