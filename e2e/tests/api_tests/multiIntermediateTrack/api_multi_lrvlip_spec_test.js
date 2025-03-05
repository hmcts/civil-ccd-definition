

const config = require('../../../config.js');
const {deleteAccount, createAccount} = require('../../../api/idamHelper');

const claimType = 'MULTI';

Feature('CCD 1v1 LR v LiP API test spec multi track @api-spec-multi-intermediate');

Before(async () => {
  await createAccount(config.defendantCitizenUser2.email, config.defendantCitizenUser2.password);
});

Scenario('1v1 LR v LiP multi track @api-prod', async ({api_spec_cui}) => {
  const mpScenario = 'ONE_V_ONE';
  await createAccount(config.defendantCitizenUser2.email, config.defendantCitizenUser2.password);
  let caseId = await api_spec_cui.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimType);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, claimType);
  await api_spec_cui.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', mpScenario, 'No', 'AWAITING_APPLICANT_INTENTION', false, claimType);
});

AfterSuite(async  ({api_spec_cui}) => {
  await api_spec_cui.cleanUp();
  await deleteAccount(config.defendantCitizenUser2.email);
});

