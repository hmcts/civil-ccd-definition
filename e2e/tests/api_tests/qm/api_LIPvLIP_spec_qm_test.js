const config = require('../../../config.js');
const {createAccount, deleteAccount} = require('../../../api/idamHelper');
const { PUBLIC_QUERY} = require('../../../fixtures/queryTypes');
const {respondToQueryAdminTask } = require('../../../fixtures/wa/respondToQueryTasks');
const {adjustCaseSubmittedDateForPublicQueries} = require('../../../helpers/lipQueriesHelper');

let caseId;

Feature('LR v LIP query management spec api journey').tag('@api-nightly-prod @api-qm');

Before(async () => {
  await createAccount(config.defendantCitizenUser2.email, config.defendantCitizenUser2.password);
});

Scenario('LR v LIP query management spec', async ({ api_spec_cui, qmSteps }) => {
  caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser, 'FastTrack', false);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, 'FastTrack', false);
  await api_spec_cui.performCitizenClaimantResponse(config.applicantCitizenUser, caseId, 'JUDICIAL_REFERRAL', false);
  await api_spec_cui.createSDO(config.judgeUserWithRegionId1, 'CREATE_FAST');
  await adjustCaseSubmittedDateForPublicQueries(caseId, true);
  let query = await qmSteps.raiseLipQuery(caseId, config.applicantCitizenUser, PUBLIC_QUERY, true);
  await qmSteps.validateQmResponseTask(caseId, config.hearingCenterAdminWithRegionId1, respondToQueryAdminTask(query.id), query.id);
  await qmSteps.respondToQuery(caseId, config.hearingCenterAdminWithRegionId1, query, PUBLIC_QUERY);
  await qmSteps.followUpOnLipQuery(caseId, config.applicantCitizenUser, query, PUBLIC_QUERY);
  query = await qmSteps.raiseLipQuery(caseId, config.defendantCitizenUser2, PUBLIC_QUERY, true);
  await qmSteps.validateQmResponseTask(caseId, config.hearingCenterAdminWithRegionId1, respondToQueryAdminTask(query.id), query.id);
  await qmSteps.respondToQuery(caseId, config.hearingCenterAdminWithRegionId1, query, PUBLIC_QUERY);
  await qmSteps.followUpOnLipQuery(caseId, config.defendantCitizenUser2, query, PUBLIC_QUERY);
});

AfterSuite(async  ({api_spec_cui}) => {
  await api_spec_cui.cleanUp();
  await deleteAccount(config.defendantCitizenUser2.email);
});
