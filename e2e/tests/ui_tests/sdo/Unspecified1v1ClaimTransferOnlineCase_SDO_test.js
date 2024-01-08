const config = require('../../../config.js');
const {assignCaseRoleToUser, unAssignAllUsers, addUserCaseMapping} = require('../../../api/caseRoleAssignmentHelper');
const {
  waitForFinishedBusinessProcess,
  checkToggleEnabled
} = require('../../../api/testingSupport');
const {PBAv3} = require('../../../fixtures/featureKeys');
const serviceRequest = require('../../../pages/createClaim/serviceRequest.page');
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

const claimant1 = {
  litigantInPerson: true
};

const respondent1 = {
  represented: true,
  representativeRegistered: true,
  representativeOrgNumber: 2
};

let caseNumber;

Feature('1v1 - Claim Journey @e2e-unspec @toc @e2e-nightly-prod');

Scenario('Applicant solicitor creates claim @create-claim', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.createCaseForTOC(claimant1, null, respondent1, null);
  caseNumber = await I.grabCaseNumber();

  const pbaV3 = await checkToggleEnabled(PBAv3);
  console.log('Is PBAv3 toggle on?: ' + pbaV3);

  if (pbaV3) {
    await serviceRequest.openServiceRequestTab();
    await serviceRequest.payFee(caseId());
  }
  await addUserCaseMapping(caseId(), config.applicantSolicitorUser);
}).retry(3);

Scenario('Applicant solicitor notifies defendant solicitor of claim', async ({I}) => {
  await I.notifyClaim();
  await assignCaseRoleToUser(caseId(), 'RESPONDENTSOLICITORONE', config.defendantSolicitorUser);
}).retry(3);

Scenario('Applicant solicitor notifies defendant solicitor of claim details', async ({I}) => {
  await I.notifyClaimDetails();
  await I.click('Sign out');
}).retry(3);

Scenario('Defendant solicitor responds to claim', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.respondToClaimForTOC({defendant1Response: 'fullDefence'});
  await I.click('Sign out');
}).retry(3);

Scenario('Claimant solicitor responds to defence', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.respondToDefenceForTOC('ONE_V_ONE');
  await waitForFinishedBusinessProcess(caseId());
  await I.click('Sign out');
}).retry(3);

Scenario('Transfer online case', async ({I}) => {
  await I.login(config.hearingCenterAdminWithRegionId4);
  await I.transferOnlineCase();
  await I.click('Sign out');
}).retry(3);

AfterSuite(async () => {
  await unAssignAllUsers();
});
