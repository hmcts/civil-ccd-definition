import { expect, Page } from '@playwright/test';
import { envUrl } from '../../../../civilConfig.ts';
import { PageHelper } from '../../../../helpers/PageHelper.ts';

// A solicitor takes over a party with a notice of change, from the "Notice of change" link on the case list (the
// first page after signing in). They give the case's 16 digit reference and their client's name exactly as the case
// has it, title included for an individual (CCD's challenge question matches the party's partyName), then confirm
// the details are right and that every party has been told. civil-service approves it straight away: the party's case
// role moves to the solicitor's organisation and the solicitor is given it, and anyone at the old organisation loses
// access. It is not an event on the case, so it is not in the Next step list.
export class NoticeOfChange {
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(caseId: string, clientName: string) {
    await this.pageHelper.gotoAndWaitForXui(envUrl);
    await this.page.getByRole('link', { name: 'Notice of change', exact: true }).click();

    // Case reference
    await expect(this.page.getByRole('heading', { name: 'Notice of change', exact: true })).toBeVisible();
    await this.page.locator('#caseRef').fill(caseId);
    await this.page.getByRole('button', { name: 'Continue' }).click();

    // Enter your client's details
    await expect(this.page.getByRole('heading', { name: 'Enter your client\'s details' })).toBeVisible();
    await this.page.locator('#clientName').fill(clientName);
    await this.page.getByRole('button', { name: 'Continue' }).click();

    // Check and submit
    await this.page.locator('#affirmation').check();
    await this.page.locator('#notifyEveryParty').check();
    await this.page.getByRole('button', { name: 'Submit' }).click();

    // XUI says the confirmation can take a while, as the request is approved before it is shown
    await expect(this.page.getByRole('heading', { name: 'Notice of change successful' })).toBeVisible({ timeout: 60_000 });
    await expect(this.page.getByText(caseId.replace(/(\d{4})(?=\d)/g, '$1-'))).toBeVisible();
  }

  // The case is in the solicitor's case list now, and opens from the confirmation's "View this case" link
  async viewCase(caseId: string) {
    await this.page.getByRole('link', { name: 'View this case' }).click();
    await this.page.waitForURL((url) => url.pathname.includes(caseId));
  }
}
