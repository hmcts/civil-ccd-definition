const config = require('../../../config.js');
const {assignCaseToLRSpecDefendant} = require('../../../api/testingSupport');
const {addUserCaseMapping, unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
const serviceRequest = require('../../../pages/createClaim/serviceRequest.page');
const {PARTY_FLAGS} = require('../../../fixtures/caseFlags');
const pdfHelper = require('../../../helpers/pdfVisualCompareHelper.js');
// Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
//const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;

const pdfDocument = 'sealed_claim_form';
const claimDocumentsTab = '.mat-tab-label:has-text("Claim Documents")';
const PDF_NAME = 'sealed_claim_form_012JE374.pdf';

let caseNumber; 

Feature('1v1 spec claim journey').tag('@civil-ccd-nightly @ui-spec-full-defence');

Scenario('01 1v1 Applicant solicitor creates specified claim for fast track-spec', async ({LRspec, I}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.createCaseSpecified('1v1 fast claim', 'organisation', null, 'company', null, 19000);
  caseNumber = await LRspec.grabCaseNumber();
  await serviceRequest.openServiceRequestTab();
  await serviceRequest.payFee(caseNumber);

   await I.navigateToCaseDetails(caseNumber);
   await I.waitForText('Summary');
  I.click(claimDocumentsTab);
  I.click(pdfDocument);

  await I.wait(2);
  I.switchToNextTab();

  const pdfPaths = pdfHelper.getPdfPaths(
      'e2e/tests/ui_tests/spec-full-defence',
      PDF_NAME
    );
  
    await pdfHelper.downloadPdfAndAssertVisualMatch({
      I,
      ...pdfPaths
    });


  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await LRspec.see(`Case ${caseNumber} has been created.`);
  addUserCaseMapping(caseNumber, config.applicantSolicitorUser);
});

Scenario('02 1v1 Defendant solicitor perform Inform Agreed Extension', async ({LRspec}) => {
  console.log('1v1 Defendant solicitor Inform Agreed Extension claim-spec: ' + caseNumber);
  await assignCaseToLRSpecDefendant(caseNumber);
  await LRspec.login(config.defendantSolicitorUser);
  //await LRspec.informAgreedExtensionDateSpec();
  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await LRspec.see(caseEventMessage('Inform agreed extension date'));
});

Scenario('03 1v1 Respond To Claim - Defendants solicitor rejects claim for defendant', async ({LRspec}) => {
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.respondToClaimFullDefence({
    defendant1Response: 'fullDefence',
    claimType: 'fast',
    defenceType: 'dispute'
  });

pause();

  // Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
  //await LRspec.see(caseEventMessage('Respond to claim'));
  //await waitForFinishedBusinessProcess(caseNumber);
});

// Scenario('04 1v1 Claimant solicitor responds to defence - claimant Intention to proceed', async ({LRspec}) => {
//   await LRspec.login(config.applicantSolicitorUser);
//   await LRspec.respondToDefence({mpScenario: 'ONE_V_ONE', claimType: 'fast'});
// }).retry(2);


AfterSuite(async  () => {
  await unAssignAllUsers();
});
