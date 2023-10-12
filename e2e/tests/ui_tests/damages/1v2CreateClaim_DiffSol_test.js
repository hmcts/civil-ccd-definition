const config = require('../../../config.js');
//const {paymentUpdate} = require('../../../api/apiRequest');
const parties = require('../../../helpers/party');
const apiRequest = require('./../../../api/apiRequest.js');
const {assignCaseRoleToUser, addUserCaseMapping, unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
const {PARTY_FLAGS} = require('../../../fixtures/caseFlags');
const {waitForFinishedBusinessProcess, checkToggleEnabled, checkCaseFlagsEnabled} = require('../../../api/testingSupport');
const {PBAv3} = require('../../../fixtures/featureKeys');
//const serviceRequest = require('../../../pages/createClaim/serviceRequest.page');
const claimData = require('../../../fixtures/events/createClaim.js');

// Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
//const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

const claimant1 = {
  litigantInPerson: false
};
const respondent1 = {
  represented: true,
  representativeRegistered: true,
  representativeOrgNumber: 2
};
const respondent2 = {
  represented: true,
  sameLegalRepresentativeAsRespondent1: false,
  representativeOrgNumber: 2
};

let caseNumber;

Feature('1v2 Different Solicitors Claim Journey @e2e-unspec @e2e-nightly @e2e-1v2DS @master-e2e-ft @e2e-regression');

Scenario('Claimant solicitor raises a claim against 2 defendants who have different solicitors', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.createCase(claimant1, null, respondent1, respondent2, 20000);
  caseNumber = await I.grabCaseNumber();

  const pbaV3 = await checkToggleEnabled(PBAv3);
  console.log('Is PBAv3 toggle on?: ' + pbaV3);

  if (pbaV3) {
    await apiRequest.paymentUpdate(caseId(), '/service-request-update-claim-issued',
      claimData.serviceUpdateDto(caseId(), 'paid'));
    console.log('Service request update sent to callback URL');
  }

  /*if (pbaV3) {
    await serviceRequest.openServiceRequestTab();
    await serviceRequest.payFee(caseId());
    await paymentUpdate(caseId(), '/service-request-update-claim-issued',
      claimData.serviceUpdateDto(caseId(), 'paid'));
    console.log('Service request update sent to callback URL');
  }*/
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(`Case ${caseNumber} has been created.`);
  addUserCaseMapping(caseId(), config.applicantSolicitorUser);
}).retry(3);

Scenario('Claimant solicitor notifies both defendants of claim', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.notifyClaim('both');
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(caseEventMessage('Notify claim'));
  await assignCaseRoleToUser(caseId(), 'RESPONDENTSOLICITORONE', config.defendantSolicitorUser);
  await assignCaseRoleToUser(caseId(),  'RESPONDENTSOLICITORTWO', config.secondDefendantSolicitorUser);
}).retry(3);

Scenario('Claimant solicitor notifies defendant solicitors of claim details', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.notifyClaimDetails('both');
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(caseEventMessage('Notify claim details'));
  await I.click('Sign out');
}).retry(3);

/*
Scenario('Defendant 1 solicitor acknowledges claim', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.acknowledgeClaim('fullDefence');
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(caseEventMessage('Acknowledge claim'));
  await I.click('Sign out');
}).retry(3);

Scenario('Defendant 2 solicitor acknowledges claim', async ({I}) => {
  await I.login(config.secondDefendantSolicitorUser);
  await I.acknowledgeClaim(null, 'fullDefence');
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(caseEventMessage('Acknowledge claim'));
  await I.click('Sign out');
}).retry(3);
*/
Scenario('Defendant 1 solicitor requests deadline extension', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.navigateToCaseDetails(caseId());
  await I.informAgreedExtensionDate();
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  // I.see(caseEventMessage('Inform agreed extension date'));
}).retry(3);

Scenario('Defendant 1 solicitor adds defendant litigation friend', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.addDefendantLitigationFriend();
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(caseEventMessage('Add litigation friend'));
}).retry(3);

Scenario('Defendant 1 solicitor rejects claim for defendant 1', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.respondToClaim({
    defendant1Response: 'fullDefence',
    twoDefendantsDiffSol: true,
    claimValue: 20000});
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(caseEventMessage('Respond to claim'));
  await I.click('Sign out');
}).retry(3);

Scenario('Defendant 2 solicitor rejects claim for defendant 2', async ({I}) => {
  await I.login(config.secondDefendantSolicitorUser);
  await I.respondToClaim({
    party: parties.RESPONDENT_SOLICITOR_2,
    defendant2Response: 'fullDefence',
    twoDefendantsDiffSol: true,
    claimValue: 20000});
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(caseEventMessage('Respond to claim'));
  await I.click('Sign out');
}).retry(3);

Scenario.skip('Claimant solicitor responds to defence', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.respondToDefence('ONE_V_TWO_TWO_LEGAL_REP', 20000);
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await I.see(caseEventMessage('View and respond to defence'));
  await waitForFinishedBusinessProcess(caseId());
}).retry(3);


Scenario('Add case flags', async ({I}) => {
  if(await checkCaseFlagsEnabled()) {
    const caseFlags = [{
      partyName: 'Example applicant1 company', roleOnCase: 'Applicant 1',
      details: [PARTY_FLAGS.vulnerableUser.value]
    }, {
      partyName: 'John Smith', roleOnCase: 'Respondent solicitor 1 witness',
      details: [PARTY_FLAGS.unacceptableBehaviour.value]
    }
    ];

    await I.login(config.hearingCenterAdminWithRegionId1);
    await I.createCaseFlags(caseFlags);
    await I.validateCaseFlags(caseFlags);
  }
}).retry(3);

Scenario('Defendant 2 solicitor adds unavailable dates', async ({I}) => {
  if (await checkToggleEnabled('update-contact-details')) {
    await I.login(config.secondDefendantSolicitorUser);
    await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId());
    await I.waitForText('Summary');
    await I.addUnavailableDates(caseId());
  }
}).retry(3);

Scenario.skip('Judge triggers SDO', async ({I}) => {
   await I.login(config.judgeUserWithRegionId1);
   await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId());
   await I.waitForText('Summary');
   await I.initiateSDO(null, null, 'fastTrack', null);
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

AfterSuite(async  () => {
  await unAssignAllUsers();
});
