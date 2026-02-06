const config = require('../../../config.js');
const { createAccount, deleteAccount } = require('../../../api/idamHelper');
const claimAmountMulti = '200001';

Feature('1vLIP spec multi track journey').tag('@ui-nightly-prod @ui-multi-track');

Scenario('1vLIP multi track', async ({api_spec_cui, I}) => {
  const mpScenario = 'ONE_V_ONE';
  await createAccount(config.defendantCitizenUser2.email, config.defendantCitizenUser2.password);
  let caseId = await api_spec_cui.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, mpScenario, 'MULTI');
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, 'MULTI');
  await I.login(config.applicantSolicitorUser);
  await I.respondToDefenceMinti(caseId, mpScenario, claimAmountMulti);
}).retry(1);

AfterSuite(async  ({api_spec_cui}) => {
  await api_spec_cui.cleanUp();
  await deleteAccount(config.defendantCitizenUser2.email);
});
