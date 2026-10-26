import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';

const eventId = 'GENERATE_DIRECTIONS_ORDER';

// The judge's directions order on the intermediate or multi track (event GENERATE_DIRECTIONS_ORDER, "Make an order"),
// made in place of a Standard Direction Order once the claim is in JUDICIAL_REFERRAL. It moves the claim to
// CASE_PROGRESSION.
//
// The judge keeps the claim on its track, chooses the blank template for an order made before a hearing, downloads it
// (civil-service generates it for the download page) and uploads the completed order, a Word document. As in the other
// event classes, each page XUI opens is looked up by its ID and answered by its handler, until check your answers.
export class MakeDirectionsOrder {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit() {
    const handlers: Record<string, () => Promise<void>> = {
      // The claim stays on the track it was allocated to
      TrackAllocation: () => this.page.locator('#finalOrderAllocateToTrack_No').click(),
      SelectTemplate: async () => {
        await this.page.locator('#finalOrderDownloadTemplateOptions').selectOption({ label: 'Blank template to be used before a hearing/box work' });
      },
      // The template civil-service generated for download
      DownloadTemplate: async () => {},
      UploadOrder: () => this.pageHelper.uploadFile(this.page.locator('#uploadOrderDocumentFromTemplate'), './playwright-tests/documents/TEST_ORDER.docx'),
    };

    await this.pageHelper.selectNextStep('Make an order');
    const pagesAnswered: string[] = [];
    for (let pageId = await this.currentPageId(); pageId !== 'submit'; pageId = await this.currentPageId()) {
      const answer = handlers[pageId];
      if (!answer) {
        throw new Error(`${eventId} showed page ${pageId}, which has no answers here (pages answered: ${pagesAnswered.join(', ')})`);
      }
      await answer();
      pagesAnswered.push(pageId);
      await this.pageHelper.continueToNextPage();
    }
    console.log(`${eventId} pages answered by the judge: ${pagesAnswered.join(', ')}`);

    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toBeVisible();
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }

  // The ID of the event page XUI is on, e.g. TrackAllocation, or submit for check your answers. The page is waited for
  // first, as XUI can still be on the previous URL straight after Continue.
  private async currentPageId(): Promise<string> {
    await expect(this.page).toHaveURL(new RegExp(`/trigger/${eventId}/[^/?#]+`));
    await this.page.getByRole('button', { name: /^(Continue|Submit)/ }).first().waitFor({ state: 'visible' });
    const lastSegment = new URL(this.page.url()).pathname.split('/').pop() ?? '';
    return lastSegment.startsWith(eventId) ? lastSegment.slice(eventId.length) : lastSegment;
  }
}
