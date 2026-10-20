import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';

// Court staff staying the case (event STAY_CASE, "Stay case"), which moves it to CASE_STAYED. civil-service keeps the
// state the claim was in (preStayState), so lifting the stay with Manage stay can take it back there. The event has one
// page and no check your answers page.
export class StayCase {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit() {
    await this.pageHelper.selectNextStep('Stay case');

    await expect(this.page.getByText('All parties will be notified.')).toBeVisible();
    await this.pageHelper.submitEvent();

    await expect(this.page.locator('#confirmation-header')).toContainText('Stay added to the case');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
