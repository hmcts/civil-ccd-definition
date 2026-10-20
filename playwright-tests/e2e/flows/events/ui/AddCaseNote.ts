import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';

// Court staff adding a note to the case (event ADD_CASE_NOTE, "Add a case note"). Staff (caseworker-civil-staff,
// legal-adviser and caseworker-civil-admin, so the hearing centre admin) can add one in any state; judges can only
// read them. civil-service moves the note to the top of the case's notes, with who added it and when, and they show
// on the Notes tab. The event has no confirmation page, so submitting goes straight back to the case.
export class AddCaseNote {
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(note: string) {
    await this.pageHelper.selectNextStep('Add a case note');

    await this.page.locator('#caseNote').fill(note);
    await this.pageHelper.continueToNextPage();

    // Check your answers and submit, which goes back to the case
    await this.pageHelper.submitEvent();
    await this.page.waitForURL((url) => !url.pathname.includes('/trigger/'));
  }

  // The note is on the Notes tab once it has been added. The tab name is matched exactly, as there is also a
  // "Listing notes" tab.
  async verifyNoteShown(note: string) {
    await this.page.getByRole('tab', { name: 'Notes', exact: true }).click();
    await expect(this.page.getByText(note)).toBeVisible();
  }
}
