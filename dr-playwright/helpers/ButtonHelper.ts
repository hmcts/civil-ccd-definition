import { Page } from "@playwright/test";

export class ButtonHelper {

    constructor(public page: Page) {}

    readonly continueButton = this.page.getByRole('button', { name: 'Continue' });
    readonly submitButton = this.page.getByRole('button', { name: 'Submit'});
    readonly closeAndReturnToCaseDetailsButton = this.page.getByRole('button', { name: 'Close and Return to case details' });
    readonly sendDirectionButton = this.page.getByRole('button', { name: 'Send direction'});
    readonly uploadButton = this.page.getByRole('button', { name: 'Upload' });
    readonly addNewButton = this.page.getByRole('button', {name: 'Add new'});

}
