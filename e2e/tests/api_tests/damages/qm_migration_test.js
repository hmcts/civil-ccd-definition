
const { applicantSolicitorUser } = require('../../../config');
const config = require('../../../config.js');
const {RESPONDENT_SOLICITOR_1_QUERY, RESPONDENT_SOLICITOR_2_QUERY, RESPONDENT_SOLICITOR_QUERY, PUBLIC_QUERY,
  APPLICANT_SOLICITOR_QUERY, RESPONDENT_SOLICITOR_1_AND_2_QUERY
} = require('../../../fixtures/queryTypes');
const {checkLRQueryManagementEnabled} = require('../../../api/testingSupport');
let isQueryManagementEnabled = false;
const isTestEnv = ['preview', 'demo'].includes(config.runningEnv);

Feature('Unspecified Notice of Change on Unpecified Claim API test @api-noc @api-noc-unspec @api-prod @api-nightly-prod');

async function raiseRespondAndFollowUpToSolicitorQueriesScenario(qmSteps, caseId, solicitorUser, caseworkerUser, queryType, isHearingRelated) {
  if (isQueryManagementEnabled) {
    const query = await qmSteps.raiseLRQuery(caseId, solicitorUser, queryType, isHearingRelated);
    await qmSteps.respondToQuery(caseId, caseworkerUser, query, queryType);
    await qmSteps.followUpOnLRQuery(caseId, solicitorUser, query, queryType);
  }
}

Before(async () => {
  isQueryManagementEnabled = await checkLRQueryManagementEnabled();
});

Scenario('1v1 Case', async ({api, qmSteps}) => {
  await api.createClaimWithRepresentedRespondent(applicantSolicitorUser);
  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  let caseId = await api.getCaseId();

  await raiseRespondAndFollowUpToSolicitorQueriesScenario(qmSteps, caseId,
    config.applicantSolicitorUser, config.ctscAdminUser,
    APPLICANT_SOLICITOR_QUERY, false,
  );

  await raiseRespondAndFollowUpToSolicitorQueriesScenario(qmSteps, caseId,
    config.defendantSolicitorUser, config.ctscAdminUser,
    RESPONDENT_SOLICITOR_1_QUERY, false,
  );
});

Scenario('1v2 Two Representatives Case', async ({api, qmSteps}) => {
  await api.createClaimWithRepresentedRespondent(applicantSolicitorUser, 'ONE_V_TWO_TWO_LEGAL_REP');
  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  let caseId = await api.getCaseId();

  await raiseRespondAndFollowUpToSolicitorQueriesScenario(qmSteps, caseId,
    config.applicantSolicitorUser, config.ctscAdminUser,
    APPLICANT_SOLICITOR_QUERY, false,
  );

  await raiseRespondAndFollowUpToSolicitorQueriesScenario(qmSteps, caseId,
    config.defendantSolicitorUser, config.ctscAdminUser,
    RESPONDENT_SOLICITOR_1_QUERY, false,
  );

  await raiseRespondAndFollowUpToSolicitorQueriesScenario(qmSteps, caseId,
    config.secondDefendantSolicitorUser, config.ctscAdminUser,
    RESPONDENT_SOLICITOR_2_QUERY, false,
  );
});


Scenario('1v2 One Representative Case', async ({ api, qmSteps }) => {
  await api.createClaimWithRepresentedRespondent(applicantSolicitorUser, 'ONE_V_TWO_ONE_LEGAL_REP');
  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  let caseId = await api.getCaseId();

  await raiseRespondAndFollowUpToSolicitorQueriesScenario(qmSteps, caseId,
    config.applicantSolicitorUser, config.ctscAdminUser,
    APPLICANT_SOLICITOR_QUERY, false,
  );

  await raiseRespondAndFollowUpToSolicitorQueriesScenario(qmSteps, caseId,
    config.defendantSolicitorUser, config.ctscAdminUser,
    RESPONDENT_SOLICITOR_1_AND_2_QUERY, false,
  );
});

Scenario('2v1 Case', async ({api, qmSteps}) => {
  await api.createClaimWithRepresentedRespondent(applicantSolicitorUser, 'TWO_V_ONE');
  await api.notifyClaim(applicantSolicitorUser);
  await api.notifyClaimDetails(applicantSolicitorUser);

  let caseId = await api.getCaseId();

  await raiseRespondAndFollowUpToSolicitorQueriesScenario(qmSteps, caseId,
    config.applicantSolicitorUser, config.ctscAdminUser,
    APPLICANT_SOLICITOR_QUERY, false,
  );

  await raiseRespondAndFollowUpToSolicitorQueriesScenario(qmSteps, caseId,
    config.defendantSolicitorUser, config.ctscAdminUser,
    RESPONDENT_SOLICITOR_1_QUERY, false,
  );
});

