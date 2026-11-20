import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';

// The claimant's solicitor uploading the particulars of claim after the claim is issued (event
// ADD_OR_AMEND_CLAIM_DOCUMENTS, "Add or amend claim documents"), which is only offered on an unspecified claim until the
// claim details are notified. The documents go in servedDocumentFiles, which Notify claim details then serves. The page's
// mid event callback only stops both a document and typed particulars of claim being given. The event leaves the claim
// in its state.
export class AddOrAmendClaimDocuments {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit() {
    await this.pageHelper.selectNextStep('Add or amend claim documents');

    // The particulars of claim are the page's first collection, so its Add new button is the first
    await this.page.locator(':nth-match(:text("Add new"), 1)').click();
    await this.pageHelper.uploadFile(
      this.page.locator('#servedDocumentFiles_particularsOfClaimDocument_value'),
      './playwright-tests/documents/TEST_DOCUMENT_1.pdf',
    );
    await this.pageHelper.continueToNextPage();

    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toContainText('Documents uploaded successfully');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
