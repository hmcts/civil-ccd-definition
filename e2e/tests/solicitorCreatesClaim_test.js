const config = require('../config.js');
const {waitForFinishedBusinessProcess, assignCaseToDefendant} = require('../api/testingSupport');

const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

let caseNumber;

Feature('Claim creation @e2e-tests');

Scenario('Applicant solicitor creates claim @create-claim', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.createCase();

  caseNumber = await I.grabCaseNumber();
  await I.see(`Case ${caseNumber} has been created.`);
});

Scenario('Applicant solicitor notifies defendant solicitor of claim', async ({I}) => {
  await I.notifyClaim();
  await I.see(caseEventMessage('Notify claim'));
  await assignCaseToDefendant(caseId());
  if (config.multipartyTestsEnabled) {
    await assignCaseToDefendant(caseId(), 'RESPONDENTSOLICITORTWO', config.secondDefendantSolicitorUser);
  }
});

Scenario('Applicant solicitor notifies defendant solicitor of claim details', async ({I}) => {
  await I.notifyClaimDetails();
  pause();
  await I.see(caseEventMessage('Notify claim details'));
  pause();
  await I.login(config.defendantSolicitorUser);
  pause();
});

Scenario('Defendant solicitor acknowledges claim', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.acknowledgeClaim('fullDefence');
  await I.see(caseEventMessage('Acknowledge claim'));
});

Scenario('Defendant solicitor requests deadline extension', async ({I}) => {
  if (config.multipartyTestsEnabled) {
    await I.login(config.secondDefendantSolicitorUser);
    await I.informAgreedExtensionDate('2');
    await I.see(caseEventMessage('Inform agreed extension date'));
  }
  await I.login(config.defendantSolicitorUser);
  await I.informAgreedExtensionDate();
  await I.see(caseEventMessage('Inform agreed extension date'));

});

Scenario('Defendant solicitor adds defendant litigation friend', async ({I}) => {
  await I.addDefendantLitigationFriend();
  await I.see(caseEventMessage('Add litigation friend'));
});

Scenario('Defendant solicitor responds to claim', async ({I}) => {
  await I.respondToClaim('fullDefence');
  await I.see(caseEventMessage('Respond to claim'));
});

Scenario('Applicant solicitor responds to defence', async ({I}) => {
  await I.login(config.applicantSolicitorUser);
  await I.respondToDefence();
  await I.see(caseEventMessage('View and respond to defence'));
  await waitForFinishedBusinessProcess(caseId());
});
