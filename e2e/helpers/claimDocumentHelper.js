const pdfHelper = require('./pdfVisualCompareHelper.js');

const CLAIM_DOCUMENTS_TAB = '.mat-tab-label:has-text("Claim Documents")';

async function viewAndAssertPdf(I, documentName, testDir, baselineDir, pdfName) {
  const pdfPaths = pdfHelper.getPdfPaths(testDir, baselineDir, pdfName);

  await I.click(CLAIM_DOCUMENTS_TAB);
  let newPagePromise;
  await I.usePlaywrightTo('register new tab listener', async ({ browserContext }) => {
    newPagePromise = browserContext.waitForEvent('page', { timeout: 30000 });
  });
  await I.click(documentName);
  await I.usePlaywrightTo('wait for new tab', async () => {
    await newPagePromise;
  });
  await I.switchToNextTab();

  await pdfHelper.downloadPdfAndAssertVisualMatch({ I, ...pdfPaths });
  await I.closeCurrentTab();
}

module.exports = { viewAndAssertPdf };
