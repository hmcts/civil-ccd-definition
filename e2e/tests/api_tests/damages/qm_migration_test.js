
const { applicantSolicitorUser } = require('../../../config');
const config = require('../../../config.js');
const {RESPONDENT_SOLICITOR_1_QUERY, RESPONDENT_SOLICITOR_2_QUERY, RESPONDENT_SOLICITOR_QUERY, PUBLIC_QUERY,
  APPLICANT_SOLICITOR_QUERY, RESPONDENT_SOLICITOR_1_AND_2_QUERY
} = require('../../../fixtures/queryTypes');
const {checkLRQueryManagementEnabled} = require('../../../api/testingSupport');
const queriesTabUrl = (caseId) => `https://xui-civil-ccd-pr-5882.preview.platform.hmcts.net/cases/case-details/${caseId}#Queries`;
let scenarios;

Feature('QM Migration Scenarios - Case Creation @qmMigration');

async function raiseQueries(qmSteps, caseId, solicitorUser, caseworkerUser, queryType, isHearingRelated, queryScenario = 'followUp') {
  const query = await qmSteps.raiseLRQuery(caseId, solicitorUser, queryType, isHearingRelated);
  if (queryScenario === 'respond' || queryScenario === 'followup') {
    await qmSteps.respondToQuery(caseId, caseworkerUser, query, queryType);
  }
  if (queryScenario === 'followup') {
    await qmSteps.followUpOnLRQuery(caseId, caseworkerUser, query, queryType);
  }
}

function logScenario(scenario) { console.log(`${scenario.scenario} ${scenario.url}`); }

BeforeSuite(async () => {
 scenarios = [];
});

async function create1v1QmScenario(scenarioName, api, qmSteps, userFocus, qmScenario) {
  await api.createClaimWithRepresentedRespondent(applicantSolicitorUser);
  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  let caseId = await api.getCaseId();

  await raiseQueries(qmSteps, caseId,
    config.applicantSolicitorUser, config.ctscAdminUser,
    APPLICANT_SOLICITOR_QUERY, false, userFocus === 'app1' ? qmScenario : undefined
  );

  await raiseQueries(qmSteps, caseId,
    config.defendantSolicitorUser, config.ctscAdminUser,
    RESPONDENT_SOLICITOR_1_QUERY, false, userFocus === 'res1' ? qmScenario : undefined
  );

  const scenario = {scenario: scenarioName, url: queriesTabUrl(caseId)};
  scenarios.push(scenario);
  logScenario(scenario);
}

async function create1v2DiffQmScenario(scenarioName, api, qmSteps, userFocus, qmScenario) {
  await api.createClaimWithRepresentedRespondent(applicantSolicitorUser, 'ONE_V_TWO_TWO_LEGAL_REP');
  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  let caseId = await api.getCaseId();

  await raiseQueries(qmSteps, caseId,
    config.applicantSolicitorUser, config.ctscAdminUser,
    APPLICANT_SOLICITOR_QUERY, false, userFocus === 'app1' ? qmScenario : undefined
  );

  await raiseQueries(qmSteps, caseId,
    config.defendantSolicitorUser, config.ctscAdminUser,
    RESPONDENT_SOLICITOR_1_QUERY, false, userFocus === 'res1' ? qmScenario : undefined
  );

  await raiseQueries(qmSteps, caseId,
    config.secondDefendantSolicitorUser, config.ctscAdminUser,
    RESPONDENT_SOLICITOR_2_QUERY, false, userFocus === 'res2' ? qmScenario : undefined
  );

  const scenario = {scenario: scenarioName, url: queriesTabUrl(caseId)};
  scenarios.push(scenario);
  logScenario(scenario);
}

async function create1v2SameSolQmScenario(scenarioName, api, qmSteps, userFocus, qmScenario) {
  await api.createClaimWithRepresentedRespondent(applicantSolicitorUser, 'ONE_V_TWO_ONE_LEGAL_REP');
  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  let caseId = await api.getCaseId();

  await raiseQueries(qmSteps, caseId,
    config.applicantSolicitorUser, config.ctscAdminUser,
    APPLICANT_SOLICITOR_QUERY, false, userFocus === 'app1' ? qmScenario : undefined
  );

  await raiseQueries(qmSteps, caseId,
    config.defendantSolicitorUser, config.ctscAdminUser,
    RESPONDENT_SOLICITOR_1_AND_2_QUERY, false, userFocus === 'res1' ? qmScenario : undefined
  );

  const scenario = {scenario: scenarioName, url: queriesTabUrl(caseId)};
  scenarios.push(scenario);
  logScenario(scenario);
}

async function create2v1QmScenario(scenarioName, api, qmSteps, userFocus, qmScenario) {
  await api.createClaimWithRepresentedRespondent(applicantSolicitorUser, 'TWO_V_ONE');
  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  let caseId = await api.getCaseId();

  await raiseQueries(qmSteps, caseId,
    config.applicantSolicitorUser, config.ctscAdminUser,
    APPLICANT_SOLICITOR_QUERY, false, userFocus === 'app1' ? qmScenario : undefined
  );

  await raiseQueries(qmSteps, caseId,
    config.defendantSolicitorUser, config.ctscAdminUser,
    RESPONDENT_SOLICITOR_1_QUERY, false, userFocus === 'app1' ? qmScenario : undefined
  );

  const scenario = {scenario: scenarioName, url: queriesTabUrl(caseId)};
  scenarios.push(scenario);
  logScenario(scenario);
}

Scenario('1v1 Case', async ({api, qmSteps}) => create1v1QmScenario('1v1 Case - Claimant - Raise a claimant query', api, qmSteps));
Scenario('1v1 Case', async ({api, qmSteps}) => create1v1QmScenario('1v1 Case - Caseworker - Respond to claimant query', api, qmSteps, 'app1', 'createQuery'));
Scenario('1v1 Case', async ({api, qmSteps}) => create1v1QmScenario('1v1 Case - Caseworker - Close claimant query', api, qmSteps, 'app1', 'createQuery'));
Scenario('1v1 Case', async ({api, qmSteps}) => create1v1QmScenario('1v1 Case - Claimant - Follow up on claimant query response', api, qmSteps, 'app1', 'respond'));
Scenario('1v1 Case', async ({api, qmSteps}) => create1v1QmScenario('1v1 Case - Claimant - Follow up on defendant query', api, qmSteps, 'res1', 'respond'));
Scenario('1v1 Case', async ({api, qmSteps}) => create1v1QmScenario('1v1 Case - Defendant 1 - Raise a defendant query', api, qmSteps));
Scenario('1v1 Case', async ({api, qmSteps}) => create1v1QmScenario('1v1 Case - Caseworker - Respond to a defendant query', api, qmSteps, 'res1', 'createQuery'));
Scenario('1v1 Case', async ({api, qmSteps}) => create1v1QmScenario('1v1 Case - Caseworker - Close defendant query', api, qmSteps, 'res1', 'createQuery'));
Scenario('1v1 Case', async ({api, qmSteps}) => create1v1QmScenario('1v1 Case - Defendant 1 - Follow up on a defendant query response', api, qmSteps, 'res1', 'respond'));
Scenario('1v1 Case', async ({api, qmSteps}) => create1v1QmScenario('1v1 Case - Defendant 1 - Follow up on claimant query', api, qmSteps, 'app1', 'respond'));
Scenario('1v2 One Representative Case', async ({ api, qmSteps }) => create1v2SameSolQmScenario('1v2 One Representative Case - Claimant - Raise a claimant query', api, qmSteps));
Scenario('1v2 One Representative Case', async ({ api, qmSteps }) => create1v2SameSolQmScenario('1v2 One Representative Case - Caseworker - Respond to claimant query', api, qmSteps, 'app1', 'createQuery'));
Scenario('1v2 One Representative Case', async ({ api, qmSteps }) => create1v2SameSolQmScenario('1v2 One Representative Case - Caseworker - Close claimant query', api, qmSteps, 'app1', 'createQuery'));
Scenario('1v2 One Representative Case', async ({ api, qmSteps }) => create1v2SameSolQmScenario('1v2 One Representative Case - Claimant - Follow up on claimant query response', api, qmSteps, 'app1', 'respond'));
Scenario('1v2 One Representative Case', async ({ api, qmSteps }) => create1v2SameSolQmScenario('1v2 One Representative Case - Claimant - Follow up on defendant query response', api, qmSteps, 'res1', 'respond'));
Scenario('1v2 One Representative Case', async ({ api, qmSteps }) => create1v2SameSolQmScenario('1v2 One Representative Case - Defendant 1 - Raise a defendant query', api, qmSteps));
Scenario('1v2 One Representative Case', async ({ api, qmSteps }) => create1v2SameSolQmScenario('1v2 One Representative Case - Caseworker - Respond to a defendant query', api, qmSteps, 'res1', 'createQuery'));
Scenario('1v2 One Representative Case', async ({ api, qmSteps }) => create1v2SameSolQmScenario('1v2 One Representative Case - Caseworker - Close defendant query', api, qmSteps, 'res1', 'createQuery'));
Scenario('1v2 One Representative Case', async ({ api, qmSteps }) => create1v2SameSolQmScenario('1v2 One Representative Case - Defendant 1 - Follow up on defendant query response', api, qmSteps, 'res1', 'respond'));
Scenario('1v2 One Representative Case', async ({ api, qmSteps }) => create1v2SameSolQmScenario('1v2 One Representative Case - Defendant 1 - Follow up on claimant query response', api, qmSteps, 'app1', 'respond'));
Scenario('1v2 Two Representatives Case', async ({api, qmSteps}) => create1v2DiffQmScenario( '1v2 Two Representatives Case - Claimant - Raise a claimant query', api, qmSteps));
Scenario('1v2 Two Representatives Case', async ({api, qmSteps}) => create1v2DiffQmScenario( '1v2 Two Representatives Case - Caseworker - Respond to claimant query', api, qmSteps, 'app1', 'createQuery'));
Scenario('1v2 Two Representatives Case', async ({api, qmSteps}) => create1v2DiffQmScenario( '1v2 Two Representatives Case - Caseworker - Close claimant query', api, qmSteps, 'app1', 'createQuery'));
Scenario('1v2 Two Representatives Case', async ({api, qmSteps}) => create1v2DiffQmScenario( '1v2 Two Representatives Case - Claimant - Follow up on claimant query response', api, qmSteps, 'app1', 'respond'));
Scenario('1v2 Two Representatives Case', async ({api, qmSteps}) => create1v2DiffQmScenario( '1v2 Two Representatives Case - Claimant - Follow up on defendant query response', api, qmSteps, 'res1', 'respond'));
Scenario('1v2 Two Representatives Case', async ({api, qmSteps}) => create1v2DiffQmScenario( '1v2 Two Representatives Case - Defendant 1 - Raise a defendant 1 query', api, qmSteps));
Scenario('1v2 Two Representatives Case', async ({api, qmSteps}) => create1v2DiffQmScenario( '1v2 Two Representatives Case - Caseworker - Respond to defendant 1 query', api, qmSteps, 'res1', 'createQuery'));
Scenario('1v2 Two Representatives Case', async ({api, qmSteps}) => create1v2DiffQmScenario( '1v2 Two Representatives Case - Caseworker - Close defendant 1 query', api, qmSteps, 'res1', 'createQuery'));
Scenario('1v2 Two Representatives Case', async ({api, qmSteps}) => create1v2DiffQmScenario( '1v2 Two Representatives Case - Defendant 1 - Follow up on defendant 1 query response', api, qmSteps, 'res1', 'respond'));
Scenario('1v2 Two Representatives Case', async ({api, qmSteps}) => create1v2DiffQmScenario( '1v2 Two Representatives Case - Defendant 1 - Follow up on claimant query response', api, qmSteps, 'app1', 'respond'));
Scenario('1v2 Two Representatives Case', async ({api, qmSteps}) => create1v2DiffQmScenario( '1v2 Two Representatives Case - Defendant 1 - Follow up on defendant 2 query response', api, qmSteps, 'res2', 'respond'));
Scenario('1v2 Two Representatives Case', async ({api, qmSteps}) => create1v2DiffQmScenario( '1v2 Two Representatives Case - Defendant 2 - Raise a defendant 2 query', api, qmSteps));
Scenario('1v2 Two Representatives Case', async ({api, qmSteps}) => create1v2DiffQmScenario( '1v2 Two Representatives Case - Caseworker - Respond to defendant 2 query', api, qmSteps, 'res2', 'createQuery'));
Scenario('1v2 Two Representatives Case', async ({api, qmSteps}) => create1v2DiffQmScenario( '1v2 Two Representatives Case - Caseworker - Close defendant 2 query', api, qmSteps, 'res2', 'createQuery'));
Scenario('1v2 Two Representatives Case', async ({api, qmSteps}) => create1v2DiffQmScenario( '1v2 Two Representatives Case - Defendant 2 - Follow up on defendant 2 query response', api, qmSteps, 'res2', 'respond'));
Scenario('1v2 Two Representatives Case', async ({api, qmSteps}) => create1v2DiffQmScenario( '1v2 Two Representatives Case - Defendant 2 - Follow up on claimant query response', api, qmSteps, 'app1', 'respond'));
Scenario('1v2 Two Representatives Case', async ({api, qmSteps}) => create1v2DiffQmScenario( '1v2 Two Representatives Case - Defendant 2 - Follow up on defendant 1 query response', api, qmSteps, 'res1', 'respond'));
Scenario('2v1 Case', async ({api, qmSteps}) => create2v1QmScenario('2v1 Case - Claimant - Raise a claimant query', api, qmSteps));
Scenario('2v1 Case', async ({api, qmSteps}) => create2v1QmScenario('2v1 Case - Caseworker - Respond to a claimant query', api, qmSteps, 'app1', 'createQuery'));
Scenario('2v1 Case', async ({api, qmSteps}) => create2v1QmScenario('2v1 Case - Caseworker - Close claimant query', api, qmSteps, 'app1', 'createQuery'));
Scenario('2v1 Case', async ({api, qmSteps}) => create2v1QmScenario('2v1 Case - Claimant - Follow up on claimant query response', api, qmSteps, 'app1', 'respond'));
Scenario('2v1 Case', async ({api, qmSteps}) => create2v1QmScenario('2v1 Case - Claimant - Follow up on defendant query response', api, qmSteps, 'res1', 'respond'));
Scenario('2v1 Case', async ({api, qmSteps}) => create2v1QmScenario('2v1 Case - Defendant 1 - Raise a defendant query', api, qmSteps));
Scenario('2v1 Case', async ({api, qmSteps}) => create2v1QmScenario('2v1 Case - Caseworker - Respond to defendant query', api, qmSteps, 'res1', 'createQuery'));
Scenario('2v1 Case', async ({api, qmSteps}) => create2v1QmScenario('2v1 Case - Caseworker - Close defendant query', api, qmSteps, 'res1', 'createQuery'));
Scenario('2v1 Case', async ({api, qmSteps}) => create2v1QmScenario('2v1 Case - Defendant 1 - Follow up on defendant query response', api, qmSteps, 'res1', 'respond'));
Scenario('2v1 Case', async ({api, qmSteps}) => create2v1QmScenario('2v1 Case - Defendant 1 - Follow up on claimant query response', api, qmSteps, 'app1', 'respond'));

AfterSuite(async () => {
  console.log('=======SCENARIOS=========');
  for(let i = 0; i < scenarios.length; i++) {
    logScenario(scenarios[i]);
  }
  console.log('=========================');
});


