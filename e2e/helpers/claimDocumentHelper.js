const pdfHelper = require('./pdfVisualCompareHelper.js');

const CLAIM_DOCUMENTS_TAB = '.mat-tab-label:has-text("Claim Documents")';

async function viewAndAssertPdf(I, documentName, baseDir, pdfName) {
  const pdfPaths = pdfHelper.getPdfPaths(baseDir, pdfName);

  await I.click(CLAIM_DOCUMENTS_TAB);
  await I.click(documentName);
  await I.wait(2);
  await I.switchToNextTab();
  await pdfHelper.downloadPdfAndAssertVisualMatch({ I, ...pdfPaths });
  await I.closeCurrentTab();
}

module.exports = { viewAndAssertPdf };
