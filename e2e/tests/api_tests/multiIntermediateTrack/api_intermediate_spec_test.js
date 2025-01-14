

const config = require('../../../config.js');
const {createAccount, deleteAccount} = require('../../../api/idamHelper');

const claimAmountPenniesIntermediate = '9900000';
const claimAmountIntermediate = '99000';
const judgeUser = config.judgeUserWithRegionId1;
const hearingCenterAdminToBeUsed = config.hearingCenterAdminWithRegionId1;
const claimType = 'INTERMEDIATE';

Feature('CCD 1v1 API test spec intermediate  track @api-spec-multi-intermediate');

async function prepareClaim(api_spec, mpScenario) {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, false, true, claimAmountPenniesIntermediate);
}

Scenario('1v1 FULL_DEFENCE Intermediate claim Specified @api-nonprod-specified', async ({api_spec}) => {
  const mpScenario = 'ONE_V_ONE';
  await prepareClaim(api_spec, mpScenario);
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', mpScenario, 'AWAITING_APPLICANT_INTENTION', false, true, claimAmountIntermediate);
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', mpScenario, 'JUDICIAL_REFERRAL', false, true);
  await api_spec.createFinalOrderJO(judgeUser, 'DOWNLOAD_ORDER_TEMPLATE', 'INTERMEDIATE');
  await api_spec.evidenceUploadApplicant(config.applicantSolicitorUser, mpScenario);
  await api_spec.scheduleHearing(hearingCenterAdminToBeUsed, 'FAST_TRACK_TRIAL');
});

Scenario('1v1 FULL_ADMISSION Intermediate claim Specified', async ({api_spec}) => {
  const mpScenario = 'ONE_V_ONE';
  await prepareClaim(api_spec, mpScenario);
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_ADMISSION', mpScenario, 'AWAITING_APPLICANT_INTENTION', false, true, claimAmountIntermediate);
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_ADMISSION', mpScenario, 'AWAITING_APPLICANT_INTENTION', false, true);
});

Scenario('1v1 PART_ADMISSION Intermediate claim Specified', async ({api_spec}) => {
  const mpScenario = 'ONE_V_ONE';
  await prepareClaim(api_spec, mpScenario);
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'PART_ADMISSION', mpScenario, 'AWAITING_APPLICANT_INTENTION', false, true, claimAmountIntermediate);
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'PART_ADMISSION', mpScenario, 'AWAITING_APPLICANT_INTENTION', false, true);
});

Scenario('1v1 COUNTER_CLAIM Intermediate claim Specified', async ({api_spec}) => {
  const mpScenario = 'ONE_V_ONE';
  await prepareClaim(api_spec, mpScenario);
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'COUNTER_CLAIM', mpScenario, 'AWAITING_APPLICANT_INTENTION', false, true, claimAmountIntermediate);
});

Scenario('1v2 full defence Intermediate claim Specified Different Solicitor', async ({api_spec}) => {
  const mpScenario = 'ONE_V_TWO';
  await prepareClaim(api_spec, mpScenario);
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE1', 'ONE_V_ONE_DIF_SOL', 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT', false, true, claimAmountIntermediate);
  await api_spec.defendantResponse(config.secondDefendantSolicitorUser, 'FULL_DEFENCE2', 'ONE_V_ONE_DIF_SOL', 'AWAITING_APPLICANT_INTENTION', false, true, claimAmountIntermediate);
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', mpScenario, 'JUDICIAL_REFERRAL', false, true);
  await api_spec.createFinalOrderJO(judgeUser, 'DOWNLOAD_ORDER_TEMPLATE', 'INTERMEDIATE');
  await api_spec.evidenceUploadApplicant(config.applicantSolicitorUser, mpScenario);
  await api_spec.scheduleHearing(hearingCenterAdminToBeUsed, 'FAST_TRACK_TRIAL');

});

Scenario('1v2  full defence Intermediate claim Specified same solicitor', async ({api_spec}) => {
  const mpScenario = 'ONE_V_TWO_SAME_SOL';
  await prepareClaim(api_spec, mpScenario);
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO','AWAITING_APPLICANT_INTENTION', false, true, claimAmountIntermediate);
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO', 'JUDICIAL_REFERRAL', false, true);
  await api_spec.createFinalOrderJO(judgeUser, 'DOWNLOAD_ORDER_TEMPLATE', 'INTERMEDIATE');
  await api_spec.evidenceUploadApplicant(config.applicantSolicitorUser, mpScenario);
  await api_spec.scheduleHearing(hearingCenterAdminToBeUsed, 'FAST_TRACK_TRIAL');
});

Scenario('1v1 LR v LiP intermediate track @api-nonprod-specified', async ({api_spec_cui}) => {
  await createAccount(config.defendantCitizenUser2.email, config.defendantCitizenUser2.password);
  let caseId = await api_spec_cui.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE', claimType);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, claimType);
  await api_spec_cui.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE_CITIZEN_DEFENDANT', 'ONE_V_ONE', 'No', 'AWAITING_APPLICANT_INTENTION', false, claimType);
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
  await deleteAccount(config.defendantCitizenUser2.email);
});

