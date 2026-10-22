import { Locator, Page } from "@playwright/test";

export class ButtonHelper {
  readonly continueButton: Locator;
  readonly previousButton: Locator;
  readonly submitButton: Locator;
  readonly closeAndReturnToCaseDetailsButton: Locator;
  readonly sendDirectionButton: Locator;
  readonly uploadButton: Locator;
  readonly addNewButton: Locator;
  readonly ignoreWarningAndContinueButton: Locator;

  constructor(public page: Page) {
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.previousButton = page.getByRole('button', { name: 'Previous' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.closeAndReturnToCaseDetailsButton = page.getByRole('button', { name: 'Close and Return to case details' });
    this.sendDirectionButton = page.getByRole('button', { name: 'Send direction' });
    this.uploadButton = page.getByRole('button', { name: 'Upload' });
    this.addNewButton = page.getByRole('button', { name: 'Add new' });
    this.ignoreWarningAndContinueButton = page.getByRole('button', { name: 'Ignore Warning and Continue' });
  }
}
