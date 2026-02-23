

const config = require('../../../config.js');

Feature('2v1 spec fast track api journeys').tag('@api-nightly-prod @api-spec-full-admit');

//Covered this scenario at line 51
Scenario.skip('2v1 fast claim full admission', async ({I, api_spec_fast}) => {
  await api_spec_fast.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'TWO_V_ONE');
  await api_spec_fast.defendantResponse(config.defendantSolicitorUser, 'FULL_ADMISSION', 'TWO_V_ONE');
});

AfterSuite(async  ({api_spec_fast}) => {
  await api_spec_fast.cleanUp();
});
