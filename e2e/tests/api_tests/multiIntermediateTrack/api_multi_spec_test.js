/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

const claimAmountPenniesMulti = '20000001';
const claimAmountMulti = '200001';
const defense = 'FULL_DEFENCE';

Feature('CCD 1v1 API test spec multi track @api-spec-multi-intermediate');

async function prepareClaim(api_spec, mpScenario) {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, false, true, claimAmountPenniesMulti);
}

Scenario('1v1 full defence Multi claim Specified @api-nonprod-specified', async ({api_spec}) => {
  const mpScenario = 'ONE_V_ONE';
  await prepareClaim(api_spec, mpScenario, defense);
  await api_spec.defendantResponse(config.defendantSolicitorUser, defense, mpScenario, 'AWAITING_APPLICANT_INTENTION', false, true, claimAmountMulti);
  await api_spec.claimantResponse(config.applicantSolicitorUser, defense, mpScenario, 'JUDICIAL_REFERRAL', false, true);
});

Scenario('1v2 full defence Multi claim Specified Different Solicitor', async ({api_spec}) => {
  const mpScenario = 'ONE_V_TWO';
  await prepareClaim(api_spec, mpScenario);
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE1', 'ONE_V_ONE_DIF_SOL',
    'AWAITING_RESPONDENT_ACKNOWLEDGEMENT', false, true, claimAmountMulti);
  await api_spec.defendantResponse(config.secondDefendantSolicitorUser, 'FULL_DEFENCE2', 'ONE_V_ONE_DIF_SOL',
    'AWAITING_APPLICANT_INTENTION', false, true, claimAmountMulti);
});

Scenario('1v2  full defence Multi claim Specified same solicitor', async ({I, api_spec}) => {
  const mpScenario = 'ONE_V_TWO_SAME_SOL';
  await prepareClaim(api_spec, mpScenario);
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO','AWAITING_APPLICANT_INTENTION', false, true, claimAmountMulti);
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});

