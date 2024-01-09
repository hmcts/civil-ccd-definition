const config = require('../../../config.js');
const {assignCaseRoleToUser, addUserCaseMapping, unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
const {checkCaseFlagsEnabled} = require('../../../api/testingSupport');
const {PARTY_FLAGS} = require('../../../fixtures/caseFlags');

let caseNumber;

Feature('Claim creation 1v2 Diff Solicitor with fast claims @e2e-spec @e2e-spec-1v2DS @master-e2e-ft');

Scenario('Applicant solicitor creates 1v2 Diff LRs specified claim defendant Different LRs for fast claims @create-claim-spec', async ({api_spec_fast, LRspec}) => {
  console.log('AApplicant solicitor creates 1v2 Diff LRs specified claim defendant Different LRs for fast claims @create-claim-spec');
  await api_spec_fast.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO');
  caseNumber = await api_spec_fast.getCaseId();
  await LRspec.setCaseId(caseNumber);
  addUserCaseMapping(caseNumber, config.applicantSolicitorUser);
}).retry(3);

Scenario('1v2 Diff LRs Fast Track Claim  - Assign roles to defendants', async () => {
    await assignCaseRoleToUser(caseNumber, 'RESPONDENTSOLICITORONE', config.defendantSolicitorUser);
    await assignCaseRoleToUser(caseNumber,  'RESPONDENTSOLICITORTWO', config.secondDefendantSolicitorUser);
  console.log('Assigned roles for defendant 1 and 2', caseNumber);
}).retry(3);

Scenario('1v2 Diff LRs Fast Track Claim  - First Defendant solicitor rejects claim', async ({LRspec}) => {
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.respondToClaimFullDefence({
    defendant1Response: 'fullDefence',
    claimType: 'fast',
    defenceType: 'dispute'
  });
  await LRspec.click('Sign out');
}).retry(3);

Scenario('1v2 Diff LRs Fast Track Claim  - Second Defendant solicitor rejects claim', async ({LRspec}) => {
  await LRspec.login(config.secondDefendantSolicitorUser);
  await LRspec.respond1v2DiffLR_FullDefence({
    secondDefendant: true,
    defendant1Response: 'fullDefence',
    claimType: 'fast',
    defenceType: 'dispute'
  });
  await LRspec.click('Sign out');
}).retry(3);

Scenario('1v2 Diff LRs Fast Track Claim  - claimant Intention to proceed', async ({LRspec}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.respondToDefence({mpScenario: 'ONE_V_ONE', claimType: 'fast'});
  await LRspec.click('Sign out');
}).retry(3);

// Skip case flags scenario as it's covered in the unspec e2e
Scenario.skip('Add case flags', async ({LRspec}) => {
  if(await checkCaseFlagsEnabled()) {
    const caseFlags = [{
      partyName: 'Example applicant1 company', roleOnCase: 'Claimant 1',
      details: [PARTY_FLAGS.vulnerableUser.value]
    }, {
      partyName: 'Example respondent1 company', roleOnCase: 'Defendant 1',
      details: [PARTY_FLAGS.unacceptableBehaviour.value]
    }
    ];

    await LRspec.login(config.hearingCenterAdminWithRegionId1);
    await LRspec.createCaseFlags(caseFlags);
    await LRspec.validateCaseFlags(caseFlags);
  }
}).retry(3);

Scenario('Judge triggers SDO', async ({LRspec}) => {
   await LRspec.login(config.judgeUser2WithRegionId2);
   await LRspec.amOnPage(config.url.manageCase + '/cases/case-details/' + caseNumber);
   await LRspec.waitForText('Summary');
   await LRspec.initiateSDO('yes', 'yes', null, null);
}).retry(3);

Scenario.skip('Claimant solicitor uploads evidence', async ({LRspec}) => {
    await LRspec.login(config.applicantSolicitorUser);
    await LRspec.evidenceUploadSpec(caseNumber, false);
}).retry(3);

Scenario('Defendant solicitor uploads evidence', async ({LRspec}) => {
    await LRspec.login(config.defendantSolicitorUser);
    await LRspec.evidenceUploadSpec(caseNumber, true);
}).retry(3);

Scenario('Schedule a hearing', async ({LRspec}) => {
    await LRspec.login(config.hearingCenterAdminWithRegionId2);
    await LRspec.amOnPage(config.url.manageCase + '/cases/case-details/' + caseNumber);
    await LRspec.waitForText('Summary');
    await LRspec.amOnPage(config.url.manageCase + '/cases/case-details/' + caseNumber + '/trigger/HEARING_SCHEDULED/HEARING_SCHEDULEDHearingNoticeSelect');
    await LRspec.createHearingScheduled();
}).retry(3);

Scenario('Transfer online case', async ({I}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await I.login(config.hearingCenterAdminWithRegionId2);
    await I.transferOnlineCase();
    await I.click('Sign out'); }
}).retry(3);

Scenario('Pay hearing fee', async ({LRspec}) => {
  await LRspec.payHearingFee();
}).retry(3);

// ToDo: Refactor to trigger create case flags event
Scenario.skip('Add case flags - validateCaseFlags', async ({LRspec}) => {
  await LRspec.login(config.adminUser);
  await LRspec.createCaseFlags();
  await LRspec.validateCaseFlags([
    { partyName: 'Example applicant1 company', details: [] },
    { partyName: 'Example respondent1 company', details: [] },
    { partyName: 'Example respondent2 company', details: [] }
  ]);
}).retry(3);

AfterSuite(async  () => {
  await unAssignAllUsers();
});
