import { Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import FinalOrder from '../../../../enums/finalOrders.ts';

// The judge's final order (event GENERATE_DIRECTIONS_ORDER, "Make an order"). On the small and fast tracks the judge
// chooses between a free form order and an assisted order and fills it in on the page. civil-service turns it into
// a document for the preview page, and the order is issued on Submit. The intermediate and multi track orders,
// which are uploaded from a template, are not coded yet.
export class MakeFinalOrder {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(order: FinalOrder) {
    if (order !== FinalOrder.FREE_FORM_ORDER && order !== FinalOrder.ASSISTED_ORDER) {
      throw new Error(`MakeFinalOrder only has the free form and assisted orders coded, not ${order}`);
    }
    await this.pageHelper.selectNextStep('Make an order');

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

    // Check your answers and submit
    await this.pageHelper.submitEvent();
    await this.page.locator('#confirmation-header').waitFor({ state: 'visible' });
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
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
}
