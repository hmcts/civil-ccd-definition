/**
 * Smoke: validates cross-party routing between LR and LiP.
 * Full lifecycle and role-based behaviour is covered by civil-service integration tests.
 *
 * CUI/LiP Test Ownership:
 * civil-ccd-definition: Owns workflow and API-level integration tests.
 * civil-citizen-ui: Owns citizen-rendered UI and routing tests.
 */

const config = require('../../../config.js');
const {createAccount, deleteCitizenAccount} = require('../../../api/idamHelper');
const { PUBLIC_QUERY} = require('../../../fixtures/queryTypes');
const {adjustCaseSubmittedDateForPublicQueries} = require('../../../helpers/lipQueriesHelper');

let caseId;

Feature('LR v LIP query management spec api smoke').tag('@civil-service-nightly');

Before(async () => {
  await createAccount(config.defendantCitizenUser2.email, config.defendantCitizenUser2.password);
});

Scenario('LR v LIP query management smoke', async ({ api_spec_cui, qmSteps }) => {
  caseId = await api_spec_cui.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE', 'FastTrack', false);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, 'FastTrack', false);
  await api_spec_cui.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE_CITIZEN_DEFENDANT', 'ONE_V_ONE', 'No', 'JUDICIAL_REFERRAL', false);
  await api_spec_cui.createSDO(config.judgeUserWithRegionId1, 'CREATE_FAST');
  await adjustCaseSubmittedDateForPublicQueries(caseId, true);
  const query = await qmSteps.raiseLRQuery(caseId, config.applicantSolicitorUser, PUBLIC_QUERY, false);
  await qmSteps.respondToQuery(caseId, config.hearingCenterAdminWithRegionId1, query, PUBLIC_QUERY);
});

AfterSuite(async  ({api_spec_cui}) => {
  await api_spec_cui.cleanUp();
  await deleteCitizenAccount(config.defendantCitizenUser2.email);
});
