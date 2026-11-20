const config = require('../../../config.js');
const solicitorUser = config.applicantSolicitorUser;

Feature('1v1 cancel unissued claim api journey').tag('@civil-service-pr @api-cancel-unissued-claim');

Scenario('1v1 cancel unissued claim spec', async ({I, api_spec}) => {
  await api_spec.createClaimWithoutPayment(solicitorUser, 'ONE_V_ONE');
  await api_spec.cancelUnissuedClaim(solicitorUser);
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
