/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

const claimAmountPenniesIntermediate = '9900000';
const claimAmountIntermediate = '99000';
const defense = 'FULL_DEFENCE';

Feature('CCD 1v1 API test spec intermediate  track @api-spec-multi-intermediate @api-nonprod @SAME');

async function prepareClaim(api_spec, mpScenario) {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, false, true, claimAmountPenniesIntermediate);
}
Scenario('1v1 full defence Intermediate claim Specified @api-nonprod-specified', async ({I, api_spec}) => {
  const mpScenario = 'ONE_V_ONE';
  await prepareClaim(api_spec, mpScenario, defense);
  //await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE', 'AWAITING_APPLICANT_INTENTION', false, true, claimAmountIntermediate);
});

// AfterSuite(async  ({api_spec}) => {
//   await api_spec.cleanUp();
// });

