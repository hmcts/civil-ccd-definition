import { Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';

// Court staff reviewing an order the judge has made (event CONFIRM_ORDER_REVIEW, "Confirm order review"). Making an
// order raises an "Order Made - Review case" task for court staff, who record any date a party must do something by
// (an obligation date), whether the order is final and whether anything is left to do on the case. A final order
// moves the claim to All_FINAL_ORDERS_ISSUED.
export class ConfirmOrderReview {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit() {
    await this.pageHelper.selectNextStep('Confirm order review');

    // No date a party must do something by
    await this.page.locator('#obligationDatePresent_No').check();
    await this.pageHelper.continueToNextPage();

    // The order is a final order
    await this.page.locator('#isFinalOrder_Yes').check();
    await this.pageHelper.continueToNextPage();

    // Nothing left to do on the case
    await this.page.locator('#courtStaffNextSteps-NO_TASKS').check();
    await this.pageHelper.continueToNextPage();

    // Check your answers and submit
    await this.pageHelper.submitEvent();
    await this.page.locator('#confirmation-header').waitFor({ state: 'visible' });
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
