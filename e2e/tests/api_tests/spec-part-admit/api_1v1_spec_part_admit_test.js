

const config = require('../../../config.js');

Feature('1v1 spec part admit api journey').tag('@api-nightly-prod @api-spec-part-admit');

Scenario('1v1 spec part admit', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'PART_ADMISSION');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'PART_ADMISSION');
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'PART_ADMISSION', 'ONE_V_ONE',
    'All_FINAL_ORDERS_ISSUED');
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});

