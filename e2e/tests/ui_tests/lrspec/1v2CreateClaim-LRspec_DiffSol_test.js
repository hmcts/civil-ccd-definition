const config = require('../../../config.js');
const {assignCaseRoleToUser, addUserCaseMapping, unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
const {checkToggleEnabled, checkCaseFlagsEnabled} = require('../../../api/testingSupport');
const {PBAv3} = require('../../../fixtures/featureKeys');
const serviceRequest = require('../../../pages/createClaim/serviceRequest.page');
const {PARTY_FLAGS} = require('../../../fixtures/caseFlags');
const {paymentUpdate} = require('../../../api/apiRequest');
const claimData = require('../../../fixtures/events/createClaimSpec');
const apiRequest = require('../../../api/apiRequest');
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

Feature('Claim creation 1v2 Diff Solicitor with fast claims @e2e-spec @e2e-spec-1v2DS @master-e2e-ft');

Scenario('Applicant solicitor creates 1v2 Diff LRs specified claim defendant Different LRs for fast claims @create-claim-spec', async ({LRspec}) => {
  console.log('AApplicant solicitor creates 1v2 Diff LRs specified claim defendant Different LRs for fast claims @create-claim-spec');
  var user = config.applicantSolicitorUser;
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.createCaseSpecified('1v2 Different LRs fast claim','organisation', null, respondent1, respondent2, 15450);
  caseNumber = await LRspec.grabCaseNumber();

  const pbaV3 = await checkToggleEnabled(PBAv3);
  console.log('Is PBAv3 toggle on?: ' + pbaV3);

  if (pbaV3) {
    await apiRequest.setupTokens(user);
    await serviceRequest.openServiceRequestTab();
    await serviceRequest.payFee(caseId());
    await paymentUpdate(caseId(), '/service-request-update-claim-issued',
      claimData.serviceUpdateDto(caseId(), 'paid'));
    console.log('Service request update sent to callback URL');
  }

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

Scenario.skip('Judge triggers SDO', async ({LRspec}) => {
   await LRspec.login(config.judgeUserWithRegionId1);
   await LRspec.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId());
   await LRspec.waitForText('Summary');
   await LRspec.initiateSDO('yes', 'yes', null, null);
}).retry(3);

Scenario.skip('Claimant solicitor uploads evidence', async ({LRspec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await LRspec.login(config.applicantSolicitorUser);
    await LRspec.evidenceUploadSpec(caseId(), false);
  }
}).retry(3);

Scenario.skip('Defendant solicitor uploads evidence', async ({LRspec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await LRspec.login(config.defendantSolicitorUser);
    await LRspec.evidenceUploadSpec(caseId(), true);
  }
}).retry(3);

Scenario.skip('Schedule a hearing', async ({LRspec}) => {
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

AfterSuite(async  () => {
  await unAssignAllUsers();
});
