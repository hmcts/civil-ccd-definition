const config = require('../../../config.js');

let mpScenario = 'ONE_V_ONE';
const judgeUser = config.judgeUserWithRegionId1;
const claimAmount = '11000';

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

Feature('1v1 unSpec enter into BS and then exit').tag('@civil-service-nightly @api-breathing-space');

Scenario('1v1 unSpec full defence and enter into Standard BS and then exit', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmount);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, null, 'FAST_CLAIM');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
  await api.createSDO(judgeUser, 'CREATE_FAST');
  await api.enterIntoBS(config.applicantSolicitorUser, mpScenario, breathingSpaceDetailsStandard, 'CASE_PROGRESSION');
  await api.liftBS(config.applicantSolicitorUser, mpScenario, liftBreathingSpaceDetails, 'CASE_PROGRESSION');
});

Scenario('1v1 unSpec full defence and enter into MentalHealth BS and then exit', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmount);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, null, 'FAST_CLAIM');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
  await api.createSDO(judgeUser, 'CREATE_FAST');
  await api.enterIntoBS(config.applicantSolicitorUser, mpScenario, breathingSpaceDetailsMentalHealth, 'CASE_PROGRESSION');
  await api.liftBS(config.applicantSolicitorUser, mpScenario, liftBreathingSpaceDetails, 'CASE_PROGRESSION');
});

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
