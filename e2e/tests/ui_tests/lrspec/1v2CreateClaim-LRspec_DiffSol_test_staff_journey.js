const config = require('../../../config.js');
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

let caseNumber;

Feature('Claim creation 1v2 Diff Solicitor with api fast claims @e2e-spec @e2e-spec-1v2DS @master-e2e-ft');

Scenario('Create claim spec 1v2', async ({LRspec, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE1', 'ONE_V_ONE_DIF_SOL',
    'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
  await api_spec.defendantResponse(config.secondDefendantSolicitorUser, 'FULL_DEFENCE2', 'ONE_V_ONE_DIF_SOL',
    'AWAITING_APPLICANT_INTENTION');
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO',
    'JUDICIAL_REFERRAL');
  caseNumber = await api_spec.getCaseId();
  LRspec.setCaseId(caseNumber);
});

Scenario('Judge triggers SDO', async ({LRspec}) => {
   await LRspec.login(config.judgeUserWithRegionId1);
   await LRspec.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId());
   await LRspec.waitForText('Summary');
   await LRspec.initiateSDO('yes', 'yes', null, null);
}).retry(3);

Scenario('Claimant solicitor uploads evidence', async ({LRspec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await LRspec.login(config.applicantSolicitorUser);
    await LRspec.evidenceUploadSpec(caseId(), false);
  }
}).retry(3);

Scenario('Defendant solicitor uploads evidence', async ({LRspec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await LRspec.login(config.defendantSolicitorUser);
    await LRspec.evidenceUploadSpec(caseId(), true);
  }
}).retry(3);

Scenario('Schedule a hearing', async ({LRspec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await LRspec.login(config.hearingCenterAdminWithRegionId1);
    await LRspec.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId());
    await LRspec.waitForText('Summary');
    await LRspec.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId() + '/trigger/HEARING_SCHEDULED/HEARING_SCHEDULEDHearingNoticeSelect');
    await LRspec.createHearingScheduled();
    await LRspec.payHearingFee();
  }
}).retry(3);

// ToDo: Refactor to trigger create case flags event
Scenario.skip('Add case flags - validateCaseFlags', async ({LRspec}) => {
  await LRspec.login(config.adminUser);
  // await I.createCaseFlags();
  await LRspec.validateCaseFlags([
    { partyName: 'Example applicant1 company', details: [] },
    { partyName: 'Example respondent1 company', details: [] },
    { partyName: 'Example respondent2 company', details: [] }
  ]);
}).retry(3);

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});