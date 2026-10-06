const config = require('../../../config.js');

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

Feature('1v2 Spec enter into BS and then exit').tag('@civil-service-nightly @api-breathing-space');

Scenario('1v2 spec full defence and enter into BS twice and then exit', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE1', 'ONE_V_ONE_DIF_SOL',
    'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
  await api_spec.defendantResponse(config.secondDefendantSolicitorUser, 'FULL_DEFENCE2', 'ONE_V_ONE_DIF_SOL',
    'AWAITING_APPLICANT_INTENTION');
  //Enter into BS and then exit for Standard BS for 1st Defendant
  await api_spec.enterIntoBS(config.applicantSolicitorUser, 'ONE_V_TWO', breathingSpaceDetailsStandard, 'AWAITING_APPLICANT_INTENTION');
  await api_spec.liftBS(config.applicantSolicitorUser, 'ONE_V_TWO', liftBreathingSpaceDetails, 'AWAITING_APPLICANT_INTENTION');

  //Enter into BS and then exit for Mental health BS for 2nd Defendant
  await api_spec.enterIntoBS(config.applicantSolicitorUser, 'ONE_V_TWO', breathingSpaceDetailsMentalHealth, 'AWAITING_APPLICANT_INTENTION');
  await api_spec.liftBS(config.applicantSolicitorUser, 'ONE_V_TWO', liftBreathingSpaceDetails, 'AWAITING_APPLICANT_INTENTION');
});

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});

