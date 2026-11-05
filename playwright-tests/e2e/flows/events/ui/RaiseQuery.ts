import { expect, Page } from '@playwright/test';
import { envUrl } from '../../../../civilConfig.ts';
import { PageHelper } from '../../../../helpers/PageHelper.ts';
import { NewQuery } from '../shared_api_ui/queryManagementSpecs.ts';

// A solicitor raising a query with the court (event queryManagementRaiseQuery, "Raise a new query"), or asking a
// follow-up question on one CTSC has answered, which is the same event. The event's pages are XUI's own query
// management screens (/query-management/query/<case id>), not CCD event pages: Continue only moves between them in the
// browser, and Submit sends the event to CCD. civil-service starts the queryManagementRaiseQuery business process, and
// work allocation gives CTSC a task to respond (see queryManagementSpecs.ts).
export class RaiseQuery {
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.pageHelper = new PageHelper(this.page);
  }

  // Raises a new query from the case's "Raise a new query" screen, with a document attached
  async raise(caseId: string, query: NewQuery) {
    await this.pageHelper.gotoAndWaitForXui(`${envUrl}/query-management/query/${caseId}`);

    // What do you need help to do?
    await expect(this.page.getByText('What do you need help to do?')).toBeVisible();
    await this.page.getByLabel('Raise a new query', { exact: true }).check();
    await this.continueTo('Enter query details');

    // Enter query details
    await this.page.locator('#subject').fill(query.subject);
    await this.page.locator('textarea#body').fill(query.body);
    if (query.hearingDate) {
      await this.page.locator('#isHearingRelated-yes').check();
      await this.page.locator('#hearingDate-day').fill(String(query.hearingDate.getDate()));
      await this.page.locator('#hearingDate-month').fill(String(query.hearingDate.getMonth() + 1));
      await this.page.locator('#hearingDate-year').fill(String(query.hearingDate.getFullYear()));
    } else {
      await this.page.locator('#isHearingRelated-no').check();
    }
    await this.page.getByRole('button', { name: 'Add new' }).click();
    await this.pageHelper.uploadFile(this.page.locator('#documentCollection_value'), './playwright-tests/documents/TEST_DOCUMENT_2.pdf');
    await this.continueTo('Review query details');

    await this.submit();
  }

  // Asks a follow-up question on the query with this subject, from the case's Queries tab, as a solicitor does once CTSC
  // has answered it: the query is opened from the tab's list, which shows CTSC's response, and "Ask a follow-up
  // question" starts the event
  async followUp(caseId: string, subject: string, response: string, question: string) {
    await this.pageHelper.gotoAndWaitForXui(`${envUrl}/cases/case-details/${caseId}`);
    await this.page.getByRole('tab', { name: 'Queries', exact: true }).click();
    await this.page.getByRole('button', { name: subject, exact: true }).click();
    await expect(this.page.getByText(response)).toBeVisible();
    await this.page.getByRole('button', { name: 'Ask a follow-up question' }).click();

    await expect(this.page.getByText('Ask a follow-up question')).toBeVisible();
    await this.page.locator('textarea#body').fill(question);
    await this.continueTo('Review query details');

    await this.submit();
  }

  // Clicks Continue until the next screen's heading shows. XUI moves between the screens itself, so a click it drops is
  // simply made again.
  private async continueTo(heading: string) {
    await expect(async () => {
      await this.page.getByRole('button', { name: 'Continue' }).click();
      await expect(this.page.getByRole('heading', { name: heading })).toBeVisible({ timeout: 5000 });
    }).toPass({ intervals: [1000, 2000], timeout: 30000 });
  }

  // Submits the query and checks XUI confirms it was sent
  private async submit() {
    await this.pageHelper.submitEvent('Submit');
    await expect(this.page.getByRole('heading', { name: 'Query submitted' })).toBeVisible();
    await expect(this.page.getByText('Your query has been sent to HMCTS')).toBeVisible();
  }
}
