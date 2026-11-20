import { expect, Page } from '@playwright/test';
import { envUrl } from '../../../../civilConfig.ts';
import { PageHelper } from '../../../../helpers/PageHelper.ts';
import { waitForQueryEvent } from './RaiseQuery.ts';

// A CTSC admin answering a query (event queryManagementRespondQuery, "Respond to a query"). They start it from their
// "Respond to a query" (or "Respond to a hearing related query") task, whose link opens XUI's response screen for the
// query's latest message (/query-management/query/<case id>/3/<message id>?tid=<task id>); the same link is used here. Like raising
// a query, the screens are XUI's own, so Continue only moves between them in the browser. XUI completes the task as it
// submits the response, and civil-service starts the queryManagementRespondQuery business process, which tells the
// solicitor.
export class RespondToQuery {
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.pageHelper = new PageHelper(this.page);
  }

  // messageId is the message being answered (the case's qmLatestQuery.queryId), and question its text, which the screen
  // shows above the response box
  async respond(caseId: string, messageId: string, question: string, response: string) {
    await this.openResponseScreen(caseId, messageId);

    await expect(this.page.getByText(question)).toBeVisible();
    await this.page.locator('textarea#body').fill(response);
    await expect(async () => {
      await this.page.getByRole('button', { name: 'Continue' }).click();
      await expect(this.page.getByRole('heading', { name: 'Review query response details' })).toBeVisible({ timeout: 5000 });
    }).toPass({ intervals: [1000, 2000], timeout: 30000 });

    await this.pageHelper.submitEvent('Submit');
    await expect(this.page.getByRole('heading', { name: 'Query response submitted' })).toBeVisible();
    await expect(this.page.getByText('This query response has been added to the case')).toBeVisible();
  }

  // Opens the response screen from the CTSC task on the case's Tasks tab, as a CTSC admin does. The task's link adds
  // the task's ID (?tid=), which XUI needs: opened without it, the screen shows nothing once Continue is pressed. Where
  // the environment gives no task (work allocation switched off), the screen is opened at its address instead.
  private async openResponseScreen(caseId: string, messageId: string) {
    const responseScreen = `/query-management/query/${caseId}/3/${messageId}`;
    await this.pageHelper.gotoAndWaitForXui(`${envUrl}/cases/case-details/${caseId}/tasks`);
    const taskLink = this.page.locator(`a[href*="${responseScreen}"]`);
    const hasTask = await taskLink.first().waitFor({ state: 'visible', timeout: 30000 }).then(() => true, () => false);
    // XUI loads the event once the screen shows; Continue before then fails in XUI's own code
    const eventLoaded = waitForQueryEvent(this.page, 'queryManagementRespondQuery');
    if (hasTask) {
      await taskLink.first().click();
    } else {
      console.log(`No CTSC task on case ${caseId}'s Tasks tab for message ${messageId}, so the response screen is opened at its address`);
      await this.pageHelper.gotoAndWaitForXui(`${envUrl}${responseScreen}`);
    }
    await eventLoaded;
    await this.page.locator('textarea#body').waitFor({ state: 'visible' });
  }
}
