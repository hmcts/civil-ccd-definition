const config = require('../config.js');

let caseNumber;

Feature('Claim creation @e2e-tests-spec');

Scenario('Applicant solicitor creates specified claim @create-claim', async (I) => {
  await I.login(config.applicantSolicitorUser);
  await I.createCaseSpec();
  caseNumber = await I.grabCaseNumber();
  await I.see(`Case ${caseNumber} has been created.`);
});
