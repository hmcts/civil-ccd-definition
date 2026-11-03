import { Page } from '@playwright/test';
import moment from 'moment-business-days';
import { PageHelper } from '../../../../helpers/PageHelper.ts';
import { workingDayAfter } from '../../../../helpers/WorkingDayHelper.ts';
import { GeneralApplication } from './GeneralApplication.ts';

// Court staff approve a general application the other side agreed to, as a consent order ("Approve Consent Order",
// APPROVE_CONSENT_ORDER, on the application), with the same answers as the API version: the order as the about to start
// callback filled it in from the order the applicant asked for and, where the order runs to a date (a stay), a working
// day four weeks away. The application must be open in the page, with court staff's ReviewApplication task claimed
// where one is needed (see WaTaskHelper).
export class ApproveConsentOrder {
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.pageHelper = new PageHelper(this.page);
  }

  async approve(orderSought: string) {
    await this.pageHelper.selectNextStep('Approve Consent Order');

    // The order, filled in from the one the applicant asked for, and the date a stay runs to
    const order = this.page.locator('#approveConsentOrder_consentOrderDescription');
    await order.waitFor({ state: 'visible' });
    if ((await order.inputValue()) === '') {
      await order.fill(orderSought);
    }
    if (await this.page.locator('#consentOrderDateToEnd-day').isVisible()) {
      await this.pageHelper.fillDate('consentOrderDateToEnd', moment(await workingDayAfter(moment().format('YYYY-MM-DD'), 28), 'YYYY-MM-DD'));
    }
    await this.pageHelper.continueToNextPage();

    // The consent order the previous page generated
    await this.pageHelper.continueToNextPage();
    await this.pageHelper.submitEvent();
    await new GeneralApplication(this.page).closeConfirmation();
  }
}
