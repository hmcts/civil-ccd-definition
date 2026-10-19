import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../helpers/PageHelper';

// Court staff updating a case flag (event MANAGE_CASE_FLAGS, "Manage case flags"). The first page lists every flag on
// the case as "<holder> - <category>, <flag type> (<comment>)"; the next updates the chosen one. Like Create case flags,
// moving within XUI's flag component sends nothing to CCD until Continue on the update page.
export class ManageCaseFlag {
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.pageHelper = new PageHelper(this.page);
  }

  // Makes a flag inactive, e.g. once the support is no longer needed. holderLabel is the holder as Create case flags
  // lists it, and flagText the flag type's name (or an "Other" flag's description).
  async makeInactive(holderLabel: string, flagText: string, comment: string) {
    await this.pageHelper.selectNextStep('Manage case flags');
    const main = this.page.locator('main');

    await main.locator('label[for^="flag-selection"]').filter({ hasText: `${holderLabel} - ` }).filter({ hasText: flagText }).first().click();
    await this.page.getByRole('button', { name: 'Continue' }).click();
    const comments = main.locator('#flagComment');
    await comments.waitFor({ state: 'visible' });

    await this.page.getByRole('button', { name: 'Make inactive' }).click();
    // The status tag reads "Inactive" (shown in capitals by its style)
    await expect(main.locator('strong').filter({ hasText: /^\s*Inactive\s*$/i })).toBeVisible();
    await comments.fill(comment);
    await this.pageHelper.continueToNextPage();

    // Check your answers shows the new status, then submit, which goes back to the case
    await expect(main.locator('dd, td').filter({ hasText: /^\s*Inactive\s*$/ }).first()).toBeVisible();
    await this.pageHelper.submitEvent();
    await this.page.waitForURL((url) => !url.pathname.includes('/trigger/'));
  }
}
