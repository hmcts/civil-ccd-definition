import { expect, Page } from '@playwright/test';
import moment from 'moment-business-days';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import FinalOrder from '../../../../enums/finalOrders.ts';

const eventId = 'GENERATE_DIRECTIONS_ORDER';

// The template each intermediate and multi track order is made from, as the judge picks it from the list
const templateLabels: Partial<Record<FinalOrder, string>> = {
  [FinalOrder.BLANK_TEMPLATE_AFTER_HEARING]: 'Blank template to be used after a hearing',
  [FinalOrder.BLANK_TEMPLATE_BEFORE_HEARING]: 'Blank template to be used before a hearing/box work',
  [FinalOrder.FIX_A_DATE_FOR_CMC]: 'Fix a date for CMC',
  [FinalOrder.FIX_A_DATE_FOR_CCMC]: 'Fix a date for CCMC',
};

// The judge's final order (event GENERATE_DIRECTIONS_ORDER, "Make an order"). On the small and fast tracks the judge
// chooses between a free form order and an assisted order and fills it in on the page. civil-service turns it into
// a document for the preview page, and the order is issued on Submit. On the intermediate and multi tracks the judge
// picks a template, downloads it (civil-service generates it for the download page) and uploads the completed order,
// a Word document.
export class MakeFinalOrder {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(order: FinalOrder) {
    await this.pageHelper.selectNextStep('Make an order');
    if (order === FinalOrder.FREE_FORM_ORDER || order === FinalOrder.ASSISTED_ORDER) {
      await this.makeSmallOrFastTrackOrder(order);
    } else {
      await this.makeTemplateOrder(order);
    }

    // Check your answers and submit
    await this.pageHelper.submitEvent();
    await this.page.locator('#confirmation-header').waitFor({ state: 'visible' });
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }

  private async makeSmallOrFastTrackOrder(order: FinalOrder) {
    // Type of order
    await this.page.locator(`#finalOrderSelection-${order}`).check();
    await this.pageHelper.continueToNextPage();

    if (order === FinalOrder.FREE_FORM_ORDER) {
      await this.fillFreeFormOrder();
    } else {
      await this.fillAssistedOrder();
    }
    await this.pageHelper.continueToNextPage();

    // Order preview (the order document is generated for this page)
    await this.pageHelper.continueToNextPage();
  }

  // An intermediate or multi track order. As in MakeDirectionsOrder, each page XUI opens is looked up by its ID and
  // answered by its handler, until check your answers.
  private async makeTemplateOrder(order: FinalOrder) {
    const handlers: Record<string, () => Promise<void>> = {
      // The claim stays on the track it was allocated to
      TrackAllocation: () => this.page.locator('#finalOrderAllocateToTrack_No').click(),
      SelectTemplate: async () => {
        await this.page.locator('#finalOrderDownloadTemplateOptions').selectOption({ label: templateLabels[order] });
      },
      // The after-hearing template asks when the hearing was, which cannot be in the future
      OrderAfterHearingDate: async () => {
        await this.page.locator('#orderAfterHearingDate_dateType-SINGLE_DATE').check();
        await this.pageHelper.fillDate('date', moment());
      },
      // The template civil-service generated for download
      DownloadTemplate: async () => {},
      UploadOrder: () => this.pageHelper.uploadFile(this.page.locator('#uploadOrderDocumentFromTemplate'), './playwright-tests/documents/TEST_ORDER.docx'),
    };

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
    console.log(`${eventId} pages answered by the judge (${order}): ${pagesAnswered.join(', ')}`);
  }

  // A free form order made on the court's own initiative, whose wording and date civil-service fills in
  private async fillFreeFormOrder() {
    await this.page.locator('#freeFormRecordedTextArea').fill('The court records that the trial took place.');
    await this.page.locator('#freeFormOrderedTextArea').fill('The court orders that judgment is entered for the claimant.');
    await this.page.locator('#orderOnCourtsList-ORDER_ON_COURT_INITIATIVE').check();
    await this.page.locator('#freeFormHearingNotes').fill('Final order made by playwright-tests');
  }

  // An assisted order made after a hearing on a single date (civil-service fills in today's date), with costs in the
  // case, made on the court's own initiative and without written reasons
  private async fillAssistedOrder() {
    await this.page.locator('#finalOrderMadeSelection_Yes').check();
    await this.page.locator('#finalOrderDateHeardComplex_finalOrderMadeRadioList-SINGLE_DATE').check();
    await this.page.locator('#finalOrderJudgePapers-CONSIDERED').check();
    await this.page.locator('#finalOrderOrderedThatText').fill('The court orders that judgment is entered for the claimant.');
    await this.page.locator('#assistedOrderCostList-COSTS_IN_THE_CASE').check();
    await this.page.locator('#orderMadeOnDetailsList-COURTS_INITIATIVE').check();
    await this.page.locator('#finalOrderGiveReasonsYesNo_No').check();
  }

  // The ID of the event page XUI is on, e.g. SelectTemplate, or submit for check your answers. The page is waited for
  // first, as XUI can still be on the previous URL straight after Continue.
  private async currentPageId(): Promise<string> {
    await expect(this.page).toHaveURL(new RegExp(`/trigger/${eventId}/[^/?#]+`));
    await this.page.getByRole('button', { name: /^(Continue|Submit)/ }).first().waitFor({ state: 'visible' });
    const lastSegment = new URL(this.page.url()).pathname.split('/').pop() ?? '';
    return lastSegment.startsWith(eventId) ? lastSegment.slice(eventId.length) : lastSegment;
  }
}
