import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import claimTypes from '../../../../enums/claim-types.ts';
import notifyClaimOptions from '../../../../enums/notifyClaimOptions.ts';
import moment from 'moment-business-days';
import CoSDelivery from '../../../../enums/CoSDelivery.ts';
import { EnumsHelper } from '../../../../helpers/EnumsHelper.ts';
import CoSLocations from '../../../../enums/CoSLocations.ts';
import CoSLocationTypes from '../../../../enums/CoSLocationTypes.ts';
import { CoSHelper } from '../../../../helpers/CoSHelper.ts';

export class NotifyClaim {

  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;
  // private whatDocumentsServed: string = 'Test description of documents served - LiP defendant:';
  // private whoClaimWasServedTo: string = 'Test description of who the claim was served to - LiP defendant:';
  // private whereDocumentsServed: string = 'Test description of where the documents were served - LiP defendant:';
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
          await this.pageHelper.continueToNextPage();

          if (whomToNotify !== notifyClaimOptions.BOTH) {
            await this.buttonHelper.ignoreWarningAndContinueButton.click();
          }
          await this.pageHelper.continueToNextPage();
          await this.pageHelper.submitEvent();
          break;
        }
      }
    } else {
      // XUI leaves out a page with nothing to ask, so a claim with a litigant in person defendant opens straight on the
      // Certificate of Service page. Continue is only clicked on the first page when it is not that page, as clicking
      // it there would send the certificate before it is filled in.
      await this.page.waitForURL(/\/trigger\/NOTIFY_DEFENDANT_OF_CLAIM\/NOTIFY_DEFENDANT_OF_CLAIM\w+/);
      if (!this.page.url().includes('CertificateOfService')) {
        await this.pageHelper.continueToNextPage();
      }
      // Each litigant in person defendant needs a Certificate of Service page completing
      if (CoSHelper.litigantInPersonDefendants(claimType).length > 0) {
        await new CoSHelper(this.page).submit(claimType);
      }
      await this.pageHelper.submitEvent();
    }
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  };

}
