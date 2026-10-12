import { Page } from '@playwright/test';
import { PageHelper } from '../../../helpers/PageHelper';
import { ButtonHelper } from '../../../helpers/ButtonHelper.ts';

// A solicitor's evidence upload once the case is in CASE_PROGRESSION ("Upload Your Documents": EVIDENCE_UPLOAD_APPLICANT
// for the claimant, EVIDENCE_UPLOAD_RESPONDENT for a defendant). It uploads a disclosure list, which the fast,
// intermediate and multi tracks all offer. The claimant's and each defendant's fields differ only in their suffix
// (documentDisclosureList, documentDisclosureListRes, documentDisclosureListRes2), so fields are found by pattern.
export class UploadEvidence {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit() {
    await this.pageHelper.selectNextStep('Upload Your Documents');
    await this.pageHelper.continueToNextPage(); // Introduction

    // When a solicitor acts for two parties (2v1 claimants, or both defendants in 1v2 same solicitor) civil-service
    // asks who the documents are for. Both parties are chosen where that is offered.
    const uploadOptions = this.page.locator('input[type=radio][id^="evidenceUploadOptions"]:visible');
    if (await uploadOptions.count() > 0) {
      const bothParties = this.page.getByLabel(/1 and 2/);
      if (await bothParties.count() > 0) {
        await bothParties.first().check();
      } else {
        await uploadOptions.first().check();
      }
      await this.pageHelper.continueToNextPage();
    }

    // Choose the documents to upload
    await this.page.locator('input[type=checkbox][id$="-DISCLOSURE_LIST"]:visible').first().check();
    await this.pageHelper.continueToNextPage();

    // Upload the disclosure list
    await this.buttonHelper.addNewButton.first().click();
    await this.pageHelper.uploadFile(
      this.page.locator('input[type=file][id^="documentDisclosureList"][id$="_0_documentUpload"]').first(),
      './dr-playwright/documents/TEST_DOCUMENT_1.pdf',
    );
    await this.pageHelper.continueToNextPage();

    // Check your answers and submit
    await this.pageHelper.submitEvent();
    const closeAndReturn = this.buttonHelper.closeAndReturnToCaseDetailsButton;
    await closeAndReturn.or(this.page.locator('#next-step')).first().waitFor({ state: 'visible' });
    if (await closeAndReturn.isVisible()) {
      await closeAndReturn.click();
    }
  }
}
