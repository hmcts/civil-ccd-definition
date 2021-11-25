const config = require('../config.js');
const {assignCaseToDefendant} = require('../api/testingSupport');

const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

let caseNumber;

const journeys = {
  journey1: {
    applicant: 'individual',
    defendant: 'individual',
  },
  journey2: {
    applicant: 'individual',
    defendant: 'company',
  },
  journey3: {
    applicant: 'individual',
    defendant: 'soleTrader',
  },
  journey4: {
    applicant: 'individual',
    defendant: 'organisation',
  },
  journey5: {
    applicant: 'company',
    defendant: 'company',
  },
  journey6: {
    applicant: 'company',
    defendant: 'soleTrader',
  },
  journey7: {
    applicant: 'company',
    defendant: 'organisation',
  },
  journey8: {
    applicant: 'soleTrader',
    defendant: 'soleTrader',
  },
  journey9: {
    applicant: 'soleTrader',
    defendant: 'organisation',
  },
  journey10: {
    applicant: 'organisation',
    defendant: 'organisation',
  },
};

Feature('Claim creation @e2e-tests-spec');

Scenario('Applicant solicitor creates specified claim organisation-to-organisation @create-claim-spec ', async ({I}) => {
  console.log(' Applicant solicitor creates specified claim organisation-to-organisation @create-claim-spec');
  await I.login(config.applicantSolicitorUser);
  await I.createCaseSpec(journeys.journey10.applicant, journeys.journey10.defendant);
  caseNumber = await I.grabCaseNumber();
  await I.see(`Case ${caseNumber} has been created.`);
  console.log('Defendant solicitor acknowledges claim-spec: ' + caseId());
  I.wait(10);
  await assignCaseToDefendant(caseId());
  //await I.login(config.defendantSolicitorUser);
  //await I.acknowledgeClaimSpec();
  //await I.see(caseEventMessage('Acknowledgement of Service'));
}).retry(3);

Scenario('Defendant solicitor responds to claim', async ({I}) => {
  await I.login(config.defendantSolicitorUser);
  await I.respondToClaimSpec('fullDefence','hasPaid',1000);
  await I.see(caseEventMessage('Respond to claim'));
}).retry(3);


/*
Scenario('Defendant solicitor responds to claim', async ({I}) => {
  //await assignCaseToDefendant(caseId());
  await I.login(config.defendantSolicitorUser);
  await I.respondToClaimSpec('fullDefence');
  await I.see(caseEventMessage('Respond to claim'));

}).retry(3);*/


