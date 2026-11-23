import { expect, Page } from '@playwright/test';
import { envUrl } from '../../../../civilConfig.ts';
import { PageHelper } from '../../../../helpers/PageHelper.ts';
import { TabsHelper } from '../../../../helpers/TabsHelper.ts';

// Refunds: not a CCD event, but XUI's payment screens (from the case's Service Request tab) and refund list (/refunds),
// backed by the payment and refunds services. A refund is asked for by a user with the refund requester role
// (payments-refund) and dealt with by one with the approver role (payments-refund-approver), who cannot be the same user.
export type RefundAction = 'APPROVE' | 'REJECT' | 'RETURN';

const confirmationHeading: Record<RefundAction, string> = {
  APPROVE: 'Refund approved',
  REJECT: 'Refund rejected',
  RETURN: 'Refund returned to caseworker',
};

export class Refund {
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.pageHelper = new PageHelper(this.page);
  }

  // Asks for the overpayment back: from the Service Request tab, the overpayment's Review link, then Issue refund. The
  // fee is chosen, the reason is "Amended claim" and the contact is an email address. Returns the refund's reference.
  async request(caseId: string): Promise<string> {
    await this.pageHelper.gotoAndWaitForXui(`${envUrl}/cases/case-details/${caseId}`);
    await new TabsHelper(this.page).selectTab('Service Request');
    // The overpayment is the payment made last, so the last Review link
    await this.page.getByRole('link', { name: 'Review' }).last().click();
    await this.page.getByRole('button', { name: 'Issue refund' }).click();

    // Process refund: the fee, the reason and the contact details
    await expect(this.page.getByRole('heading', { name: 'Process refund' })).toBeVisible();
    await this.page.locator('[name="organisation"]').first().check();
    await this.continueUntilGone(this.page.getByText('Select fees to be refunded'));
    await this.page.locator('input[id="Amended claim"]').check();
    await this.continueUntilGone(this.page.getByText('Why are you making this refund?'));
    await this.page.locator('#email').fill('refunds@playwright-tests.hmcts.net');
    await this.continueUntilGone(this.page.getByText('Contact information'));

    // Check your answers, then the confirmation with the refund's reference
    await expect(this.page.getByRole('heading', { name: 'Check your answers' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Submit refund' }).click();
    return this.refundSubmitted();
  }

  // The approver deals with the refund from the refund list: approves it, rejects it (no associated payment) or
  // returns it to the caseworker with a reason
  async process(caseId: string, refundReference: string, action: RefundAction) {
    await this.openFromRefundList(caseId, 'Process refund');
    await expect(this.page.getByRole('heading', { name: 'Review refund details' })).toBeVisible();
    await expect(this.page.getByText(refundReference)).toBeVisible();
    if (action === 'APPROVE') {
      await this.page.locator('#refundAction-0').check();
    } else if (action === 'REJECT') {
      await this.page.locator('#refundAction-1').check();
      await this.page.locator('#refundRejectReason-0').check();
    } else {
      await this.page.locator('#refundAction-2').check();
      // The reason is refused ("Add a valid reason") if it has punctuation, so it is plain words
      await this.page.locator('#sendmeback').fill('Returned by playwright tests please check the reason');
    }
    await this.page.getByRole('button', { name: 'Submit' }).click();
    await expect(this.page.getByRole('heading', { name: confirmationHeading[action] })).toBeVisible();
  }

  // The claimant's solicitor changes a returned refund's reason to "System/technical error" and sends it again
  async resubmit(caseId: string, refundReference: string) {
    await this.openFromRefundList(caseId, 'Review refund');
    await expect(this.page.getByText(refundReference)).toBeVisible();
    await this.page.getByRole('button', { name: 'Change refund details' }).click();
    await expect(this.page.getByRole('heading', { name: 'Check your answers' })).toBeVisible();
    // Change is an <a> with no href, so it is not a link to Playwright's role selectors
    await this.page.locator('tr:has-text("Reason for refund")').locator('a', { hasText: 'Change' }).click();
    await this.page.locator('input[id="System/technical error"]').check();
    await this.continueUntilGone(this.page.getByText('Why are you making this refund?'));
    await expect(this.page.getByRole('heading', { name: 'Check your answers' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Submit refund' }).click();
    await this.refundSubmitted();
  }

  // The refund list (/refunds) shows a user the refunds waiting for them, in tables of 10 rows a page. Every approver
  // and requester on the environment shares them (AAT has around a hundred waiting), oldest first, so each table is
  // sorted by Last updated twice to put the newest first, as the case's refund is. New ones can take a moment to show,
  // so the list is reloaded until the case's row does. The case reference is shown with dashes (1234-5678-...).
  private async openFromRefundList(caseId: string, linkName: string) {
    const shownCaseId = caseId.replace(/(\d{4})(?=\d)/g, '$1-');
    const row = this.page.locator('mat-row', { hasText: shownCaseId });
    await expect(async () => {
      await this.pageHelper.gotoAndWaitForXui(`${envUrl}/refunds`);
      await expect(this.page.getByRole('heading', { name: 'Refund list' })).toBeVisible();
      // The tables fill in once the refunds service answers
      await expect(this.page.locator('mat-row').first()).toBeVisible({ timeout: 30000 });
      const sortHeaders = this.page.locator('mat-header-cell.cdk-column-date_updated [role="button"]');
      for (let index = 0; index < await sortHeaders.count(); index++) {
        await sortHeaders.nth(index).click();
        await sortHeaders.nth(index).click();
      }
      await expect(row.getByRole('link', { name: linkName })).toBeVisible({ timeout: 10000 });
    }).toPass({ intervals: [5000], timeout: 120000 });
    await row.getByRole('link', { name: linkName }).click();
  }

  private async refundSubmitted(): Promise<string> {
    await expect(this.page.getByRole('heading', { name: 'Refund submitted' })).toBeVisible();
    const reference = (await this.page.getByText(/RF-\d{4}-\d{4}-\d{4}-\d{4}/).first().innerText()).match(/RF-[\d-]+/)?.[0];
    expect(reference, 'The refund confirmation did not show the refund\'s reference').toBeTruthy();
    console.log(`Refund ${reference} submitted`);
    return reference;
  }

  private async continueUntilGone(onPage: ReturnType<Page['getByText']>) {
    await expect(async () => {
      await this.page.getByRole('button', { name: 'Continue' }).click();
      await expect(onPage).toBeHidden({ timeout: 5000 });
    }).toPass({ intervals: [1000, 2000], timeout: 30000 });
  }
}
