import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../helpers/PageHelper';
import { ButtonHelper } from '../../../helpers/ButtonHelper.ts';
import claimTypes from '../../../enums/claim-types.ts';
import notifyClaimOptions from '../../../enums/notifyClaimOptions.ts';

export class NotifyClaim {

  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async notify(claimType: claimTypes, whomToNotify: notifyClaimOptions = notifyClaimOptions.BOTH) {

    await this.pageHelper.selectNextStep('Notify claim');
    if (claimType === claimTypes.ONE_VS_TWO_DIFF_SOL) {
      await expect(this.page.locator('#defendantSolicitorNotifyClaimOptions')).toContainText('Both');
      const notifyOptions: string[] = await this.page.locator('#defendantSolicitorNotifyClaimOptions > option').allTextContents();

      for (const [i, value] of notifyOptions.entries()) {
        if (value.indexOf(whomToNotify) > -1) {
          await this.page.locator('#defendantSolicitorNotifyClaimOptions').selectOption({ index: i });
          await this.buttonHelper.continueButton.click();

          if (whomToNotify !== notifyClaimOptions.BOTH) {
            await this.buttonHelper.IgnoreWarningAndContinueButton.click();
          }
          await this.buttonHelper.continueButton.click();
          await this.buttonHelper.submitButton.click();
          break;
        }
      }
    } else {
      await this.buttonHelper.continueButton.click();
      await this.buttonHelper.submitButton.click();
    }
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  };

}
