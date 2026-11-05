import { Locator, Page } from "@playwright/test";
//import {runningEnv} from "../../../iacConfig";
import { createCase } from '../../../civilConfig.ts';
import { PageHelper } from '../../../helpers/PageHelper.ts';

export class CreateCasePage {
  private jurisdictionLocator: string;
  private caseTypeLocator: string;
  private caseTypeOptionLocator: string;
  private eventLocator: string;


  readonly createCaseLink: Locator;
  readonly startButton: Locator;

  constructor(public page: Page) {
    this.createCaseLink = page.getByRole('link', { name: 'Create case' });
    this.startButton = page.getByRole('button', { name: 'Start' });
  }


  async createCase(caseType: string = 'UNSPECIFIED') {
    const ccJurisdiction = this.page.locator('#cc-jurisdiction');
    const ccCaseType = this.page.locator('#cc-case-type');
    const ccEvent = this.page.locator('#cc-event')

    await this.createCaseLink.click();
    // CCD can take longer than the action timeout to return the jurisdictions, leaving the list empty, so wait for
    // an option other than "--Select a value--" and reload if it doesn't arrive
    await new PageHelper(this.page).waitForReady(ccJurisdiction.locator('option').nth(1), 'The Create case jurisdiction list');
    await ccJurisdiction.selectOption(createCase.jurisdictionCode);
    await ccCaseType.selectOption(createCase.caseTypeCode);
    await ccEvent.selectOption(caseType === 'SPECIFIED' ? createCase.specifiedEventCode : createCase.eventCode);
    await this.clickStart();
  }

  // XUI can drop a click on Start, or be slow to open the event, leaving the Create Case page showing. Start is
  // clicked again only while the page is still Create Case, so a second claim is never started: once the event's
  // first page is open (/case-create/<jurisdiction>/<case type>/<event>/...) nothing more is clicked.
  // Each click is given 30s, as a busy AAT can take over 20s to open the event, and clicking again too soon could cut
  // the first one off
  private async clickStart(attempts: number = 3, waitSeconds: number = 30) {
    const eventOpened = (url: URL) => /\/case-create\/[^/]+\/[^/]+\/[^/]+\//.test(url.pathname);
    for (let attempt = 1; attempt <= attempts; attempt++) {
      if (eventOpened(new URL(this.page.url()))) {
        return;
      }
      await this.startButton.click();
      const opened = await this.page.waitForURL(eventOpened, { timeout: waitSeconds * 1000 }).then(() => true, () => false);
      if (opened) {
        return;
      }
      if (attempt < attempts) {
        console.log(`Start did not open the claim within ${waitSeconds}s, clicking it again (attempt ${attempt + 1} of ${attempts})`);
      }
    }
    throw new Error(`Start did not open the claim after ${attempts} clicks of ${waitSeconds}s each`);
  }
}
