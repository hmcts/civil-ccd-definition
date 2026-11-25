import { Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper.ts';
import { GeneralApplication } from './GeneralApplication.ts';
import { GaOrder, GaOrderAnswers } from '../shared_api_ui/gaOrderSpecs.ts';

// A judge makes an order on a general application once its hearing is scheduled ("Make an order",
// GENERATE_DIRECTIONS_ORDER, on the application), with the same answers as the API version:
//  - a free form order: its recitals and what it orders, with no note about notice
//  - an assisted order: not made following a hearing, what it orders, costs in the case, no public funding costs
//    protection, no further hearing or appeal, no note about notice and no reasons
// The order page generates the order document the next page previews. civil-service then issues the order and moves
// the application to ORDER_MADE. The application must be open in the page.
export class MakeOrderOnApplication {
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(order: GaOrder, answers: GaOrderAnswers) {
    await this.pageHelper.selectNextStep('Make an order');

    // The type of order. The radios on these pages have no name, and a click from Playwright does not leave one
    // selected, so the page's own click is used (as a user's click does), as in MakeDecisionOnApplication.
    await this.clickRadio(`#finalOrderSelection-${order}`);
    await this.pageHelper.continueToNextPage();

    if (order === GaOrder.FREE_FORM_ORDER) {
      await this.page.locator('#freeFormRecitalText').fill(answers.recitals);
      await this.page.locator('#freeFormOrderedText').fill(answers.ordered);
      await this.clickRadio('#orderOnCourtsList-NOT_APPLICABLE');
    } else {
      await this.clickRadio('#assistedOrderMadeSelection_No');
      await this.page.locator('#assistedOrderOrderedThatText').fill(answers.orderedThat);
      await this.clickRadio('#assistedCostTypes-COSTS_IN_CASE');
      await this.clickRadio('#publicFundingCostsProtection_No');
      await this.clickRadio('#orderMadeOnOption-NONE');
      await this.clickRadio('#assistedOrderGiveReasonsYesNo_No');
    }
    await this.pageHelper.continueToNextPage();

    // The order the previous page generated
    await this.pageHelper.continueToNextPage();
    await this.pageHelper.submitEvent();
    await new GeneralApplication(this.page).closeConfirmation();
  }

  private async clickRadio(selector: string) {
    await this.page.locator(selector).evaluate((radio: HTMLInputElement) => radio.click());
  }
}
