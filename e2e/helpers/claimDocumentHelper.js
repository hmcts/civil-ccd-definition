const pdfHelper = require('./pdfVisualCompareHelper.js');

const CLAIM_DOCUMENTS_TAB = '.mat-tab-label:has-text("Claim Documents")';

async function viewAndAssertPdf(I, documentName, testDir, baselineDir, pdfName) {
  const pdfPaths = pdfHelper.getPdfPaths(testDir, baselineDir, pdfName);

  await I.click(CLAIM_DOCUMENTS_TAB);
  await I.click(documentName);
  await I.usePlaywrightTo('wait for new tab', async ({ browserContext }) => {
  await browserContext.waitForEvent('page', { timeout: 10000 });
  });
  await I.switchToNextTab();

  await pdfHelper.downloadPdfAndAssertVisualMatch({ I, ...pdfPaths });
  await I.closeCurrentTab();
}

module.exports = { viewAndAssertPdf };
