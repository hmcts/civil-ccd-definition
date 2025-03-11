

const config = require('../../../config.js');
const {createAccount, deleteAccount} = require('../../../api/idamHelper');
const claimType = 'INTERMEDIATE';

Feature('CCD 1v1 LR v LiP API test spec intermediate  track @api-spec-multi-intermediate');

Before(async () => {
  await createAccount(config.defendantCitizenUser2.email, config.defendantCitizenUser2.password);
});

Scenario('1v1 LR v LiP intermediate track @api-prod', async ({api_spec_cui}) => {
  let caseId = await api_spec_cui.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE', claimType);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, claimType);
  await api_spec_cui.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE_CITIZEN_DEFENDANT', 'ONE_V_ONE', 'No', 'AWAITING_APPLICANT_INTENTION', false, claimType);
});

AfterSuite(async  ({api_spec_cui}) => {
  await api_spec_cui.cleanUp();
  await deleteAccount(config.defendantCitizenUser2.email);
});

