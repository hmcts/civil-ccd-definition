

const config = require('../../../config.js');

const claimAmountPenniesMulti = '20000001';
const claimAmountMulti = '200001';
const judgeUser = config.judgeUserWithRegionId1;
const hearingCenterAdminToBeUsed = config.hearingCenterAdminWithRegionId1;

Feature('1v1 spec api multi track journey').tag('@api-multi-intermediate-spec @api-nightly-prod');

Scenario('1v1 spec full defence multi claim', async ({api_spec}) => {
  const mpScenario = 'ONE_V_ONE';
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, false, true, claimAmountPenniesMulti);
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', mpScenario, 'AWAITING_APPLICANT_INTENTION', false, true, claimAmountMulti);
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', mpScenario, 'JUDICIAL_REFERRAL', false, true);
  await api_spec.createFinalOrderJO(judgeUser, 'DOWNLOAD_ORDER_TEMPLATE', 'MULTI');
  await api_spec.evidenceUploadRespondent(config.defendantSolicitorUser, mpScenario);
  await api_spec.scheduleHearing(hearingCenterAdminToBeUsed, 'FAST_TRACK_TRIAL', true);
});

Scenario('1v1 spec full admission multi claim', async ({api_spec}) => {
  const mpScenario = 'ONE_V_ONE';
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, false, true, claimAmountPenniesMulti);
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_ADMISSION', mpScenario, 'AWAITING_APPLICANT_INTENTION', false, true, claimAmountMulti);
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_ADMISSION', mpScenario, 'AWAITING_APPLICANT_INTENTION', false, true);
});

Scenario.skip('1v1 spec part admission multi claim', async ({api_spec}) => {
  const mpScenario = 'ONE_V_ONE';
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, false, true, claimAmountPenniesMulti);
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'PART_ADMISSION', mpScenario, 'AWAITING_APPLICANT_INTENTION', false, true, claimAmountMulti);
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'PART_ADMISSION', mpScenario, 'AWAITING_APPLICANT_INTENTION', false, true);
});

Scenario('1v1 spec counter claim multi claim', async ({api_spec}) => {
  const mpScenario = 'ONE_V_ONE';
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, false, true, claimAmountPenniesMulti);
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'COUNTER_CLAIM', mpScenario, 'AWAITING_APPLICANT_INTENTION', false, true, claimAmountMulti);
});

Scenario('1v2DS spec full defence multi claim', async ({api_spec}) => {
  const mpScenario = 'ONE_V_TWO';
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, false, true, claimAmountPenniesMulti);
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE1', 'ONE_V_ONE_DIF_SOL', 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT', false, true, claimAmountMulti);
  await api_spec.defendantResponse(config.secondDefendantSolicitorUser, 'FULL_DEFENCE2', 'ONE_V_ONE_DIF_SOL', 'AWAITING_APPLICANT_INTENTION', false, true, claimAmountMulti);
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', mpScenario, 'JUDICIAL_REFERRAL', false, true);
  await api_spec.createFinalOrderJO(judgeUser, 'DOWNLOAD_ORDER_TEMPLATE', 'MULTI');
  await api_spec.evidenceUploadRespondent(config.defendantSolicitorUser, mpScenario);
  await api_spec.scheduleHearing(hearingCenterAdminToBeUsed, 'FAST_TRACK_TRIAL', true);
});

Scenario('1v2SS spec full defence multi claim @debug', async ({I, api_spec}) => {
  const mpScenario = 'ONE_V_TWO_SAME_SOL';
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, false, true, claimAmountPenniesMulti);
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO','AWAITING_APPLICANT_INTENTION', false, true, claimAmountMulti);
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO', 'JUDICIAL_REFERRAL', false, true);
  await api_spec.createFinalOrderJO(judgeUser, 'DOWNLOAD_ORDER_TEMPLATE', 'MULTI');
  await api_spec.evidenceUploadRespondent(config.defendantSolicitorUser, mpScenario);
  await api_spec.scheduleHearing(hearingCenterAdminToBeUsed, 'FAST_TRACK_TRIAL', true);
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
