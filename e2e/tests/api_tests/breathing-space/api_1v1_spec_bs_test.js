const config = require('../../../config.js');

let mpScenario = 'ONE_V_ONE';

// For today's date
const today = new Date().toISOString().split('T')[0];

//For last weeks date
const date = new Date();
date.setDate(date.getDate() - 7);
const lastWeekDate = date.toISOString().split('T')[0];

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

Feature('1v1 spec enter into BS').tag('@civil-service-nightly @api-spec-bs');

Scenario('1v1 spec full defence and enter into Standard BS', async ({api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec.defendantResponse(config.defendantSolicitorUser);
  await api_spec.enterIntoBS(config.applicantSolicitorUser, mpScenario, breathingSpaceDetailsStandard, 'AWAITING_APPLICANT_INTENTION');
});

Scenario('1v1 spec full defence and enter into Mental health BS', async ({api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec.defendantResponse(config.defendantSolicitorUser);
  await api_spec.enterIntoBS(config.applicantSolicitorUser, mpScenario, breathingSpaceDetailsMentalHealth, 'AWAITING_APPLICANT_INTENTION');
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});

