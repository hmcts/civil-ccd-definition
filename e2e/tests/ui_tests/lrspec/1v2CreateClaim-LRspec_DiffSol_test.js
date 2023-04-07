const config = require('../../../config.js');
const {assignCaseRoleToUser, addUserCaseMapping, unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
const {checkCaseFlagsEnabled} = require('../../../api/testingSupport');
const {payClaimFee} = require('../../../api/pbav3CompatibilityHelper');
const {PARTY_FLAGS} = require('../../../fixtures/caseFlags');
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

const respondent1 = {
  represented: true,
  representativeRegistered: true,
  representativeOrgNumber: 2
};
const respondent2 = {
  represented: true,
  sameLegalRepresentativeAsRespondent1: false,
  representativeOrgNumber: 3
};

let caseNumber;

Feature('Claim creation 1v2 Diff Solicitor with fast claims @e2e-tests-spec @e2e-spec-1v2DS @master-e2e-ft');

Scenario('Applicant solicitor creates 1v2 Diff LRs specified claim defendant Different LRs for fast claims @create-claim-spec', async ({LRspec}) => {
  console.log('Logging in as', config.applicantSolicitorUser.email);
  await LRspec.login(config.applicantSolicitorUser);
  console.log('Logged in as', config.applicantSolicitorUser.email);
  await LRspec.createCaseSpecified('1v2 Different LRs fast claim','organisation', null, respondent1, respondent2, 15450);
  caseNumber = await LRspec.grabCaseNumber();
  console.log('Case created. Case number: ', caseNumber);
  payClaimFee(caseId());
  addUserCaseMapping(caseId(), config.applicantSolicitorUser);
}).retry(3);

Scenario('1v2 Diff LRs Fast Track Claim  - Assign roles to defendants', async () => {
    await assignCaseRoleToUser(caseId(), 'RESPONDENTSOLICITORONE', config.defendantSolicitorUser);
    await assignCaseRoleToUser(caseId(),  'RESPONDENTSOLICITORTWO', config.secondDefendantSolicitorUser);
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

Scenario('Add case flags', async ({LRspec}) => {
  if(checkCaseFlagsEnabled()) {
    const caseFlags = [{
      partyName: 'Example applicant1 company', roleOnCase: 'Applicant 1',
      details: [PARTY_FLAGS.vulnerableUser.value]
    }, {
      partyName: 'Example respondent1 company', roleOnCase: 'Respondent 1',
      details: [PARTY_FLAGS.unacceptableBehaviour.value]
    }
    ];

    await LRspec.login(config.hearingCenterAdminWithRegionId1);
    await LRspec.createCaseFlags(caseFlags);
    await LRspec.validateCaseFlags(caseFlags);
  }
});

Scenario('Judge triggers SDO', async ({LRspec}) => {
   await LRspec.login(config.judgeUserWithRegionId1);
   await LRspec.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId());
   await LRspec.waitForText('Summary');
   await LRspec.initiateSDO('yes', 'yes', null, null);
}).retry(3);

// Scenario('Claimant solicitor uploads evidence', async ({LRspec}) => {
//   if (['preview', 'demo'].includes(config.runningEnv)) {
//     await LRspec.login(config.applicantSolicitorUser);
//     await LRspec.evidenceUpload(caseId(), false);
//   }
// }).retry(3);
//
// Scenario('Defendant solicitor uploads evidence', async ({LRspec}) => {
//   if (['preview', 'demo'].includes(config.runningEnv)) {
//     await LRspec.login(config.defendantSolicitorUser);
//     await LRspec.evidenceUpload(caseId(), true);
//   }
// }).retry(3);

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

AfterSuite(async  () => {
  await unAssignAllUsers();
});
