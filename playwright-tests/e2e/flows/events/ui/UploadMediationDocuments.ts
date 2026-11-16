import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import {
  documentDate, mediationPartyCode, referredDocumentType, statementName,
} from '../shared_api_ui/uploadMediationDocumentsSpecs.ts';

const testDocument = './playwright-tests/documents/TEST_DOCUMENT_1.pdf';

// A solicitor uploading mediation documents (event UPLOAD_MEDIATION_DOCUMENTS, "Upload mediation documents"), offered on
// a specified small claim once mediation is over: for every party they act for (see mediationPartyCode), a
// non-attendance statement and a document referred to in it. Returns the party option chosen.
export class UploadMediationDocuments {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(): Promise<string> {
    await this.pageHelper.selectNextStep('Upload mediation documents');

    // What the documents are for; Continue fills in the parties to choose from
    await this.pageHelper.continueToNextPage();

    // Who the documents are for
    const options = this.page.locator('input[type=radio][id^="uploadMediationDocumentsPartyChosen_"]');
    await expect(options.first()).toBeVisible();
    const codes = (await options.evaluateAll((inputs) => inputs.map((input) => input.id)))
      .map((id) => id.replace('uploadMediationDocumentsPartyChosen_', ''));
    const chosen = mediationPartyCode(codes);
    await this.page.locator(`#uploadMediationDocumentsPartyChosen_${chosen}`).check();
    await this.pageHelper.continueToNextPage();

    // Which documents
    await this.page.locator('#mediationDocumentsType-NON_ATTENDANCE_STATEMENT').check();
    await this.page.locator('#mediationDocumentsType-REFERRED_DOCUMENTS').check();
    await this.pageHelper.continueToNextPage();

    // The documents themselves. Both collections have a field called documentDate, so each is found inside its own.
    const date = documentDate();
    const statement = this.page.locator('#nonAttendanceStatementForm');
    await this.addEntry(statement, this.page.locator('#nonAttendanceStatementForm_0_yourName'));
    await this.page.locator('#nonAttendanceStatementForm_0_yourName').fill(statementName);
    await this.fillDate(statement, date);
    await this.pageHelper.uploadFile(this.page.locator('#nonAttendanceStatementForm_0_document'), testDocument);

    const referred = this.page.locator('#documentsReferredForm');
    await this.addEntry(referred, this.page.locator('#documentsReferredForm_0_documentType'));
    await this.page.locator('#documentsReferredForm_0_documentType').fill(referredDocumentType);
    await this.fillDate(referred, date);
    await this.pageHelper.uploadFile(this.page.locator('#documentsReferredForm_0_document'), testDocument);
    await this.pageHelper.continueToNextPage();

    // Check your answers and submit
    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toContainText('Documents uploaded');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
    return chosen;
  }

  // Adds an entry to a collection with its "Add new" button, clicking again until the entry's first field shows: XUI
  // can redraw the page as an upload finishes, which swallows the click (the button keeps focus, but no entry opens)
  private async addEntry(collection: ReturnType<Page['locator']>, firstField: ReturnType<Page['locator']>) {
    await expect(async () => {
      if (!(await firstField.isVisible())) {
        await collection.getByRole('button', { name: 'Add new' }).first().click();
      }
      await expect(firstField).toBeVisible({ timeout: 2000 });
    }).toPass({ timeout: 20000 });
  }

  private async fillDate(container: ReturnType<Page['locator']>, date: ReturnType<typeof documentDate>) {
    // The inputs only: each one's "Day", "Month" or "Year" label has an ID ending the same way
    await container.locator('input[id="documentDate-day"]').fill(date.date().toString());
    await container.locator('input[id="documentDate-month"]').fill((date.month() + 1).toString());
    await container.locator('input[id="documentDate-year"]').fill(date.year().toString());
  }
}
