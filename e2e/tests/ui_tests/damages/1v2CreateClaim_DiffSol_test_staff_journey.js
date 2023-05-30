const config = require('../../../config.js');

// Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
//const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';

let caseNumber;

Feature('1v2 Different Solicitors Claim Journey @e2e-unspec @e2e-nightly @e2e-unspec-1v2DS @master-e2e-ft');

Scenario('Claimant solicitor raises a claim against 2 defendants who have different solicitors', async ({I, api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.defendantResponse(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION');
  caseNumber = await api.getCaseid();
  I.setCaseId(caseNumber);
}).retry(3);


Scenario('Judge triggers SDO', async ({I}) => {
   await I.login(config.judgeUserWithRegionId1);
   await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId());
   await I.waitForText('Summary');
   await I.initiateSDO('yes', 'yes', null, null);
}).retry(3);

Scenario('Claimant solicitor uploads evidence', async ({I}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await I.login(config.applicantSolicitorUser);
    await I.evidenceUpload(caseId(), false);
  }
}).retry(3);

Scenario('Defendant solicitor uploads evidence', async ({I}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await I.login(config.defendantSolicitorUser);
    await I.evidenceUpload(caseId(), true);
  }
}).retry(3);

Scenario('Make a general application', async ({api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api.initiateGeneralApplication(caseId(), config.applicantSolicitorUser, 'CASE_PROGRESSION');
  }
}).retry(3);

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});