const config = require('../../../config.js');
const {createAccount, deleteAccount} = require('../../../api/idamHelper');

let caseId;

Feature('LIPvLIP spec request for reconsideration api journeys').tag('@api-nightly-prod');

Before(async () => {
  await createAccount(config.applicantCitizenUser.email, config.applicantCitizenUser.password);
  await createAccount(config.defendantCitizenUser2.email, config.defendantCitizenUser2.password);
});

Scenario('1v1 LiP v LiP Request for reconsideration', async ({api_spec_cui}) => {
  caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser, 'Request for reconsideration track', false);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, 'Request for reconsideration track', false, 'FULL_DEFENCE');
  await api_spec_cui.performCitizenClaimantResponse(config.applicantCitizenUser, caseId, 'JUDICIAL_REFERRAL', false);
  await api_spec_cui.createSDO(config.tribunalCaseworkerWithRegionId4);
  await api_spec_cui.requestForReconsiderationCitizen(config.applicantCitizenUser);
  await api_spec_cui.judgeDecisionOnReconsiderationRequest(config.judgeUserWithRegionId1, 'CREATE_SDO');
}).tag('@api-rfr');;

AfterSuite(async  ({api_spec_cui}) => {
  await api_spec_cui.cleanUp();
  await deleteAccount(config.applicantCitizenUser.email);
  await deleteAccount(config.defendantCitizenUser2.email);
});