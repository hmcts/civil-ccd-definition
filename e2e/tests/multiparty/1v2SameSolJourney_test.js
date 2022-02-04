const config = require('../../config.js');
const parties = require('../../helpers/party');

const {assignCaseToDefendant, waitForFinishedBusinessProcess} = require('../../api/testingSupport');

const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;
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
  sameLegalRepresentativeAsRespondent1: true
};

let caseNumber;

Feature('1v2 Same Solicitor Claim Journey @e2e-multiparty');

Scenario('Claimant solicitor raises a claim against 2 defendants who have the same solicitor', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.createCase(claimant1, null, respondent1, respondent2);
  caseNumber = await I.grabCaseNumber();
  await I.see(`Case ${caseNumber} has been created.`);
}).retry(3);

Scenario('Claimant solicitor notifies both defendants of claim', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.notifyClaim();
  await I.see(caseEventMessage('Notify claim'));
  await assignCaseToDefendant(caseId());
  await assignCaseToDefendant(caseId(), 'RESPONDENTSOLICITORTWO', config.defendantSolicitorUser);
}).retry(3);

Scenario('Claimant solicitor notifies defendant solicitor of claim details', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.notifyClaimDetails();
  await I.see(caseEventMessage('Notify claim details'));
  await I.click('Sign out');
}).retry(3);

Scenario('Defendant solicitor acknowledges claim', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.acknowledgeClaim('fullDefence', 'fullDefence', null, true);
  await I.see(caseEventMessage('Acknowledge claim'));
  await I.click('Sign out');
}).retry(3);

Scenario('Defendant solicitor requests deadline extension', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.navigateToCaseDetails(caseId());
  await I.informAgreedExtensionDate();
  await I.see(caseEventMessage('Inform agreed extension date'));
}).retry(3);

Scenario('Defendant solicitor adds defendant litigation friend', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.addDefendantLitigationFriend('both');
  await I.see(caseEventMessage('Add litigation friend'));
}).retry(3);

Scenario('Defendants solicitor rejects claim for both defendants', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.respondToClaim({
    party: parties.RESPONDENT_SOLICITOR_1,
    twoDefendants: true,
    sameResponse: true,
    defendant1Response: 'fullDefence'});
  await I.see(caseEventMessage('Respond to claim'));
  await I.click('Sign out');
}).retry(3);

Scenario('Claimant solicitor responds to defence', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.respondToDefence();
  await I.see(caseEventMessage('View and respond to defence'));
  await waitForFinishedBusinessProcess(caseId());
}).retry(3);
