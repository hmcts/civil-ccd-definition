/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';
const legalAdvUser = config.tribunalCaseworkerWithRegionId1Local; //TODO change to tribunalCaseworkerWithRegionId4 ???
const judgeUser = config.judgeUserWithRegionId1;

Feature('CCD 1v1 API Spec test @api-dj-1v1, @api-dj @api-prod-dj');

Scenario('1v1 full defence claimant and defendant response @api-prod-specified', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec.informAgreedExtensionDate(config.applicantSolicitorUser);
  await api_spec.defendantResponse(config.defendantSolicitorUser);
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', mpScenario,
    'AWAITING_APPLICANT_INTENTION');
  // await api_spec.createFinalOrderJO(judgeUser, 'FREE_FORM_ORDER');
  // await api_spec.recordJudgment(legalAdvUser, mpScenario, 'DETERMINATION_OF_MEANS', 'PAY_IN_INSTALMENTS');
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
