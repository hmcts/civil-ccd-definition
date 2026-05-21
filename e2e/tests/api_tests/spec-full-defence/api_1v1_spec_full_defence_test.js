

const config = require('../../../config.js');
const pdfHelper = require('../../../helpers/pdfVisualCompareHelper.js');

const sealedClaimPdfDocument = 'sealed_claim_form';
const claimDocumentsTab = '.mat-tab-label:has-text("Claim Documents")';
const SEALED_CLAIM_PDF = 'sealed_claim_form.pdf';


Feature('1v1 spec full defence api journey').tag('@civil-service-nightly @api-spec-full-defence');

Scenario('1v1 spec full defence', async ({api_spec, I}) => {
const caseId =  
await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);

 await I.login(config.applicantSolicitorUser);
  await I.navigateToCaseDetails(caseId);
  await I.waitForText('Summary');

 await I.click(claimDocumentsTab);
 await I.click(sealedClaimPdfDocument);

  await I.wait(2);
  await I.switchToNextTab();

  const pdfPaths = pdfHelper.getPdfPaths(
        'e2e/tests/api_tests/spec-full-defence',
        SEALED_CLAIM_PDF
      );
    
      await pdfHelper.downloadPdfAndAssertVisualMatch({
        I,
        ...pdfPaths
      });

      await I.closeCurrentTab();
      await I.wait(2);
        await I.closeCurrentTab();


   await api_spec.informAgreedExtensionDate(config.applicantSolicitorUser);
  

   await api_spec.defendantResponse(config.defendantSolicitorUser);

   await I.login(config.defendantSolicitorUser);
   await I.navigateToCaseDetails(caseId);
  await I.waitForText('Summary');
  await I.click(claimDocumentsTab);

   pause(); 
  // await api_spec.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE',
  //   'AWAITING_APPLICANT_INTENTION');
});

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});

