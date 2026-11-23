import { Page } from '@playwright/test';
import moment from 'moment-business-days';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import trackType from '../../../../enums/track.ts';

// A solicitor's evidence upload once the case is in CASE_PROGRESSION ("Upload Your Documents": EVIDENCE_UPLOAD_APPLICANT
// for the claimant, EVIDENCE_UPLOAD_RESPONDENT for a defendant). It uploads a disclosure list, which the fast,
// intermediate and multi tracks all offer, or on the small claims track, which has no disclosure, documentary evidence
// for the hearing. The claimant's and each defendant's fields differ only in their suffix (documentDisclosureList,
// documentDisclosureListRes, documentDisclosureListRes2), so fields are found by pattern.
export class UploadEvidence {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(track: trackType = trackType.FAST) {
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

    if (track === trackType.SMALL) {
      await this.uploadDocumentaryEvidence();
    } else {
      await this.uploadDisclosureList();
    }

    // Check your answers and submit
    await this.pageHelper.submitEvent();
    const closeAndReturn = this.buttonHelper.closeAndReturnToCaseDetailsButton;
    await closeAndReturn.or(this.page.locator('#next-step')).first().waitFor({ state: 'visible' });
    if (await closeAndReturn.isVisible()) {
      await closeAndReturn.click();
    }
  }

  private async uploadDisclosureList() {
    // Choose the documents to upload
    await this.page.locator('input[type=checkbox][id$="-DISCLOSURE_LIST"]:visible').first().check();
    await this.pageHelper.continueToNextPage();

    // Upload the disclosure list
    await this.buttonHelper.addNewButton.first().click();
    await this.pageHelper.uploadFile(
      this.page.locator('input[type=file][id^="documentDisclosureList"][id$="_0_documentUpload"]').first(),
      './playwright-tests/documents/TEST_DOCUMENT_1.pdf',
    );
    await this.pageHelper.continueToNextPage();
  }

  // A small claim's documentary evidence for the hearing: what the document is, when it was issued (a month ago) and
  // the file
  private async uploadDocumentaryEvidence() {
    // Choose the documents to upload
    await this.page.locator('input[type=checkbox][id^="trialSelectionEvidenceSmallClaim"][id$="-DOCUMENTARY"]:visible').first().check();
    await this.pageHelper.continueToNextPage();

    // Upload the documentary evidence
    await this.buttonHelper.addNewButton.first().click();
    const entry = (name: string) => this.page.locator(`[id^="documentEvidenceForTrial"][id$="_0_${name}"]`).first();
    await entry('typeOfDocument').fill('Invoice');
    await this.pageHelper.fillDate('documentIssuedDate', moment().subtract(1, 'month'));
    await this.pageHelper.uploadFile(entry('documentUpload'), './playwright-tests/documents/TEST_DOCUMENT_1.pdf');
    await this.pageHelper.continueToNextPage();
  }
}
