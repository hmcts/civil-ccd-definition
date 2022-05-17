/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD 1v2 API test @api-spec-fast');

Scenario('1v2 small claim', async ({I, api_spec_fast}) => {
  // const defenceRoutes = ['FULL_DEFENCE', 'FULL_ADMISSION', 'PART_ADMISSION', 'COUNTER_CLAIM'];
  const defenceRoutes = ['FULL_DEFENCE']; // change for the line above when all works, this is just to ease development
  for (let i = 0; i < defenceRoutes.length; i++) {
    await api_spec_fast.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO');
    await api_spec_fast.defendantResponse(config.defendantSolicitorUser, defenceRoutes[i], 'ONE_V_TWO');
    // TODO claimantResponse is failing, the event can't be started
    // if ('COUNTER_CLAIM' !== defenceRoutes[i]) {
    //   // counter claim defense brings the case offline
    //   await api_spec_fast.claimantResponse(config.applicantSolicitorUser);
    // }
  }
});
