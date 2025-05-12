const config = require('../../../config.js');
const {APPLICANT_SOLICITOR_QUERY, RESPONDENT_SOLICITOR_QUERY} = require('../../../fixtures/queryTypes');
const {checkLRQueryManagementEnabled} = require('../../../api/testingSupport');
const mpScenario = 'ONE_V_ONE';
let isQueryManagementEnabled = false;

//This test runs in api_judgment_online_1v1_test - so running only in nightly
Feature('CCD 1v1 API test @api-unspec @api-multiparty @api-tests-1v1 @api-nightly-prod @QM @testGL');

async function raiseRespondAndFollowUpToQueriesScenario(qmSteps, caseId, solicitorUser, caseworkerUser, queryType, isHearingRelated) {
  if (isQueryManagementEnabled) {
    const claimantSolicitorQuery = await qmSteps.raiseQuery(caseId, solicitorUser, queryType, isHearingRelated);
    await qmSteps.respondToQuery(caseId, caseworkerUser, claimantSolicitorQuery, queryType);
    await qmSteps.followUpOnQuery(caseId, solicitorUser, claimantSolicitorQuery, queryType);
  }
}

Before(async () => {
  isQueryManagementEnabled = await checkLRQueryManagementEnabled();
});

Scenario('Create claim', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
});

Scenario('HMCTS admin adds a case note to case', async ({api}) => {
  await api.addCaseNote(config.adminUser);
});

Scenario('Amend claim documents', async ({api}) => {
  await api.amendClaimDocuments(config.applicantSolicitorUser);
});

Scenario('Notify claim', async ({api}) => {
  await api.notifyClaim(config.applicantSolicitorUser);
});

Scenario('Notify claim details', async ({api}) => {
  await api.notifyClaimDetails(config.applicantSolicitorUser);
});

Scenario('Amend party details', async ({api}) => {
  await api.amendPartyDetails(config.adminUser);
});

Scenario('Acknowledge claim', async ({api}) => {
  await api.acknowledgeClaim(config.defendantSolicitorUser, mpScenario);
});

Scenario('Inform agreed extension date', async ({api}) => {
  await api.informAgreedExtension(config.defendantSolicitorUser, mpScenario);
});

Scenario('Add Litigation Friend', async ({api}) => {
  await api.addDefendantLitigationFriend(config.defendantSolicitorUser, mpScenario);
});

Scenario('Defendant response', async ({api}) => {
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario);
});

Scenario('Claimant response', async ({api}) => {
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
});

Scenario('Add case flags', async ({api}) => {
  await api.createCaseFlags(config.hearingCenterAdminWithRegionId1);
});

Scenario('Manage case flags', async ({api}) => {
  await api.manageCaseFlags(config.hearingCenterAdminWithRegionId1);
});

Scenario('Manage contact information', async ({api}) => {
  await api.manageDefendant1Details(config.adminUser);
  await api.manageDefendant1LROrgDetails(config.defendantSolicitorUser);
});

Scenario('Claimant queries', async ({api, qmSteps}) => {
  await raiseRespondAndFollowUpToQueriesScenario(qmSteps, await api.getCaseId(),
    config.applicantSolicitorUser, config.hearingCenterAdminWithRegionId1,
    APPLICANT_SOLICITOR_QUERY, true
  );
});

Scenario('Defendant queries', async ({api, qmSteps}) => {
  await raiseRespondAndFollowUpToQueriesScenario(qmSteps, await api.getCaseId(),
    config.defendantSolicitorUser, config.ctscAdminUser,
    RESPONDENT_SOLICITOR_QUERY, false
  );
});

Scenario('Create claim where respondent is litigant in person and notify/notify details @api-cos', async ({api}) => {
  await api.createClaimWithRespondentLitigantInPerson(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaimLip(config.applicantSolicitorUser);
  await api.notifyClaimDetailsLip(config.applicantSolicitorUser, mpScenario);
});

Scenario('Create claim and move it to caseman', async ({api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api.moveCaseToCaseman(config.adminUser);
});

// This will be enabled when PAY-3817 issue of two minutes is fixed
Scenario.skip('Resubmit claim after payment failure on PBA account ', async ({api}) => {
  await api.createClaimWithFailingPBAAccount(config.applicantSolicitorUser);
  await api.resubmitClaim(config.applicantSolicitorUser);
});

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});
