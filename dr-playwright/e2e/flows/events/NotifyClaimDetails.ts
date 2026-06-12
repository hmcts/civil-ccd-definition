import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../helpers/PageHelper';
import { ButtonHelper } from '../../../helpers/ButtonHelper.ts';
import claimTypes from '../../../enums/claim-types.ts';
import notifyClaimOptions from '../../../enums/notifyClaimOptions.ts';
import { CoSHelper } from '../../../helpers/CoSHelper.ts';

export class NotifyClaimDetails {

  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async notify(claimType: claimTypes, whomToNotify: notifyClaimOptions = notifyClaimOptions.BOTH) {

    await this.pageHelper.selectNextStep('Notify claim details');
    if (claimType === claimTypes.ONE_VS_TWO_DIFF_SOL) {
      await expect(this.page.locator('#defendantSolicitorNotifyClaimDetailsOptions')).toContainText('Both');
      const notifyOptions: string[] = await this.page.locator('#defendantSolicitorNotifyClaimDetailsOptions > option').allTextContents();

      for (const [i, value] of notifyOptions.entries()) {
        if (value.indexOf(whomToNotify) > -1) {
          await this.page.locator('#defendantSolicitorNotifyClaimDetailsOptions').selectOption({ index: i });
          await this.buttonHelper.continueButton.click();

          if (whomToNotify === notifyClaimOptions.BOTH) {
            await this.buttonHelper.continueButton.click();
          } else {
            await this.buttonHelper.IgnoreWarningAndContinueButton.click();
          }

          await this.uploadNotifyClaimDetailsDocs();
          await this.buttonHelper.continueButton.click();
          await this.buttonHelper.submitButton.click();
          break;
        }
      }
    } else {
      await this.uploadNotifyClaimDetailsDocs();
      await this.buttonHelper.continueButton.click();
      if (claimType === claimTypes.ONE_VS_TWO_LR_LIP || claimType === claimTypes.ONE_VS_TWO_LIP_LR) {
        await new CoSHelper(this.page).submit(claimType, 'NotifyClaimDetails');
      }
      await this.buttonHelper.submitButton.click();
    }
  };



  private async uploadNotifyClaimDetailsDocs() {
    const documentsMap = new Map<number, string>([
      [1, 'particularsOfClaim'],
      [3, 'medicalReport'],
      [5, 'scheduleOfLoss'],
      [7, 'certificateOfSuitability']
    ]);

    const rateLimitError: string = 'Your request was rate limited. Please wait a few seconds before retrying your document upload';
    const uploading: string = 'Uploading...';

    for (let [addNewButtonIndex, documentType] of documentsMap.entries()) {
      await this.page.locator(`:nth-match(:text("Add new"), ${addNewButtonIndex})`).click();
      if (documentType === 'particularsOfClaim') {
        await this.page.locator(`#servedDocumentFiles_${documentType}Document_value`).setInputFiles('./dr-playwright/documents/TEST_DOCUMENT_1.pdf');
        await this.page.waitForSelector('.error-message', { state: 'hidden' });
      } else {
        const messageLocator  = this.page.locator(`#servedDocumentFiles_${documentType}_0_0`).locator('.error-message');
        const documentLocator = this.page.locator(`#servedDocumentFiles_${documentType}_0_document`);

        if (await messageLocator.innerText() !== uploading || await messageLocator.innerText() !== rateLimitError)  {
          await documentLocator.setInputFiles('./dr-playwright/documents/TEST_DOCUMENT_2.pdf');

          if (await messageLocator.innerText() === uploading || await messageLocator.innerText() === rateLimitError) {
            await documentLocator.setInputFiles('./dr-playwright/documents/TEST_DOCUMENT_2.pdf');
          }
        } else {
          await messageLocator.waitFor({state: 'hidden'});
        }
      }
    }
  }
}
