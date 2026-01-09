const config = require('../../../config.js');
const {assignCaseRoleToUser, addUserCaseMapping, unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
const {waitForFinishedBusinessProcess} = require('../../../api/testingSupport');
const serviceRequest = require('../../../pages/createClaim/serviceRequest.page');

const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;
let caseNumber;

const claimant1 = {
  litigantInPerson: false
};
const respondent1 = {
  represented: true,
  representativeRegistered: true,
  representativeOrgNumber: 2
};

Feature('RPA handoff points tests').tag('@ui-rpa-handoff-tests');

Scenario('Prepare case up to inform agreed extension date, then take claim offline', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.createCase(claimant1, null , respondent1, null, 25000);
  caseNumber = await I.grabCaseNumber();

  await serviceRequest.openServiceRequestTab();
  await serviceRequest.payFee(caseId());

  await I.notifyClaim();
  await addUserCaseMapping(caseId(),config.applicantSolicitorUser);
  await assignCaseRoleToUser(caseId(), 'RESPONDENTSOLICITORONE', config.defendantSolicitorUser);
  await I.notifyClaimDetails();
  await I.login(config.defendantSolicitorUser);
  await I.acknowledgeClaim('fullDefence');
  await I.informAgreedExtensionDate();

  await I.login(config.adminUser);
  await I.caseProceedsInCaseman(caseNumber);
  await I.assertHasEvents(['Amend party details', 'Add a case note']);
  await I.signOut();
}).retry(2);

Scenario('Defendant - Defend part of Claim', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.createCase(claimant1, null , respondent1, null, 25000);
  caseNumber = await I.grabCaseNumber();

  await serviceRequest.openServiceRequestTab();
  await serviceRequest.payFee(caseId());

  await I.notifyClaim();
  await addUserCaseMapping(caseId(),config.applicantSolicitorUser);
  await assignCaseRoleToUser(caseId(), 'RESPONDENTSOLICITORONE', config.defendantSolicitorUser);
  await I.notifyClaimDetails();
  await I.login(config.defendantSolicitorUser);
  await I.navigateToCaseDetails(caseNumber);
  await I.acknowledgeClaim('partDefence');
  await I.informAgreedExtensionDate();
  await I.respondToClaim({defendant1Response: 'partDefence', claimValue: 25000});

  await waitForFinishedBusinessProcess(caseId());
  await I.navigateToCaseDetails(caseNumber);
  await I.assertHasEvents(['Raise a new query']);
  await I.signOut();
}).retry(2);

Scenario('Defendant - Defends, Claimant decides not to proceed', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.createCase(claimant1, null , respondent1, null, 25000);
  caseNumber = await I.grabCaseNumber();

  await serviceRequest.openServiceRequestTab();
  await serviceRequest.payFee(caseId());

  await I.notifyClaim();
  await addUserCaseMapping(caseId(),config.applicantSolicitorUser);
  await assignCaseRoleToUser(caseId(), 'RESPONDENTSOLICITORONE', config.defendantSolicitorUser);
  await I.notifyClaimDetails();
  await I.login(config.defendantSolicitorUser);
  await I.navigateToCaseDetails(caseNumber);
  await I.acknowledgeClaim('fullDefence');
  await I.informAgreedExtensionDate();
  await I.respondToClaim({defendant1Response: 'fullDefence', claimValue: 25000});

  await I.login(config.applicantSolicitorUser);
  await I.respondToDefenceDropClaim();
  await I.assertHasEvents(['Raise a new query']);
  await I.signOut();
}).retry(2);

Scenario('Defendant - Defends, Claimant decides to proceed', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.createCase(claimant1, null , respondent1, null, 25000);
  caseNumber = await I.grabCaseNumber();

  await serviceRequest.openServiceRequestTab();
  await serviceRequest.payFee(caseId());

  await I.notifyClaim();
  await addUserCaseMapping(caseId(),config.applicantSolicitorUser);
  await assignCaseRoleToUser(caseId(), 'RESPONDENTSOLICITORONE', config.defendantSolicitorUser);
  await I.notifyClaimDetails();
  await I.login(config.defendantSolicitorUser);
  await I.navigateToCaseDetails(caseNumber);
  await I.acknowledgeClaim('fullDefence');
  await I.informAgreedExtensionDate();
  await I.respondToClaim({defendant1Response: 'fullDefence', claimValue: 25000});

  await I.login(config.applicantSolicitorUser);
  await I.respondToDefence('ONE_V_ONE', 25000);
  await I.assertHasEvents(['Raise a new query']);
  await I.signOut();
}).retry(2);

AfterSuite(async  () => {
  await unAssignAllUsers();
});
