

const config = require('../../../config.js');
const solicitorUser = config.applicantSolicitorUser;
const caseWorkerUser = config.hearingCenterAdminWithRegionId2;
// To use on local because the idam images are different:
// const caseWorkerUser = config.hearingCenterAdminLocal;

Feature('2v1 discontinue claim spec api journey').tag('@api-nightly-prod @api-discontinue-claim');

Scenario('2v1 discontinue claim spec', async ({I, api_spec}) => {
    let mpScenario = 'TWO_V_ONE';
    await api_spec.createClaimWithRepresentedRespondent(solicitorUser, mpScenario);
    await api_spec.discontinueClaim(solicitorUser, mpScenario);
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
