import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../helpers/PageHelper';
import { ButtonHelper } from '../../../helpers/ButtonHelper.ts';
import claimTypes from '../../../enums/claim-types.ts';
import notifyClaimOptions from '../../../enums/notifyClaimOptions.ts';

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
            await this.uploadNotifyClaimDetailsDocs();
           // await this.buttonHelper.submitButton.click();
          } else {
            await this.buttonHelper.IgnoreWarningAndContinueButton.click();
            await this.buttonHelper.continueButton.click();
            await this.buttonHelper.submitButton.click();
          }
          break;
        }
      }
    } else {
      await this.buttonHelper.continueButton.click();
      await this.buttonHelper.submitButton.click();
    }
 //   await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
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

   // await this.page.waitForTimeout(4000); // waits for 4 seconds

  //  await this.page.locator('button:text("Add new")').click();
    // getting rate cap error message - waiting for 4 secs to stop this happening
    //await this.page.waitForTimeout(4000); // waits for 4 seconds

    for (let [addNewButtonIndex, documentType] of documentsMap.entries()) {
      console.log(addNewButtonIndex + '>>>>> ' + documentType);
      await this.page.locator(`:nth-match(:text("Add new"), ${addNewButtonIndex})`).click();
      if (documentType === 'particularsOfClaim') {
        await this.page.locator(`#servedDocumentFiles_${documentType}Document_value`).setInputFiles('./dr-playwright/documents/TEST_DOCUMENT_1.pdf');
     //   await this.page.fill('#servedDocumentFiles_particularsOfClaimText', 'Test Particulars of claim document.');
        await this.page.waitForSelector('.error-message', { state: 'hidden' });
      } else {
        //servedDocumentFiles_medicalReport_0_0
        //servedDocumentFiles_scheduleOfLoss_0_0

        const messageLocator  = this.page.locator(`#servedDocumentFiles_${documentType}_0_0`).locator('.error-message');
        const documentLocator = this.page.locator(`#servedDocumentFiles_${documentType}_0_document`);

        if (await messageLocator.innerText() !== uploading || await messageLocator.innerText() !== rateLimitError)  {
          await documentLocator.setInputFiles('./dr-playwright/documents/TEST_DOCUMENT_2.pdf');

          console.log(await messageLocator.getAttribute('class'));
          console.log(await messageLocator.innerText());
          if (await messageLocator.innerText() === uploading || await messageLocator.innerText() === rateLimitError) {
            await documentLocator.setInputFiles('./dr-playwright/documents/TEST_DOCUMENT_2.pdf');
          } else {
          }
        } else {
          await messageLocator.waitFor({state: 'hidden'});
        }
        // check for rate limit error
       // const parent = this.page.locator(`#servedDocumentFiles_${documentType}_0_0`).filter({ hasText: 'Your request was rate limited. Please wait a few seconds before retrying your document upload'});
       //  await this.page.waitForTimeout(20000); // waits for 4 seconds
       //  console.log(await parent.getAttribute('class'));


        // Loop backwards through all previous siblings
        // console.log(await spanLocator.innerText());
        // await this.page.waitForTimeout(4000); // waits for 4 seconds
        // await this.page.waitForSelector('.error-message', { state: 'hidden' });
      }
    }


 //   await this.page.waitForTimeout(50000); // waits for 2 seconds

    // await this.page.locator('#servedDocumentFiles_particularsOfClaimDocument_value').setInputFiles('./dr-playwright/documents/TEST_DOCUMENT_1.pdf');
    //
    //
    // await this.page.fill('#servedDocumentFiles_particularsOfClaimText', 'Test Particulars of claim document.');
    // await this.page.waitForSelector('.error-message', { state: 'hidden' });
    //
    // await this.page.locator(':nth-match(:text("Add new"), 3)').click();
    // await this.page.waitForTimeout(4000); // waits for 4 seconds
    // await this.page.locator('#servedDocumentFiles_medicalReport_0_document').setInputFiles('./dr-playwright/documents/TEST_DOCUMENT_2.pdf');
    // await this.page.waitForSelector('.error-message', { state: 'hidden' });
    //
    // await this.page.locator(':nth-match(:text("Add new"), 5)').click();
    // await this.page.waitForTimeout(4000); // waits for 4 seconds
    // await this.page.locator('#servedDocumentFiles_scheduleOfLoss_0_document').setInputFiles('./dr-playwright/documents/TEST_DOCUMENT_3.pdf');
    // await this.page.waitForSelector('.error-message', { state: 'hidden' });
    //
    // await this.page.locator(':nth-match(:text("Add new"), 7)').click();
    // await this.page.waitForTimeout(4000); // waits for 4 seconds
    // await this.page.locator('#servedDocumentFiles_certificateOfSuitability_0_document').setInputFiles('./dr-playwright/documents/TEST_DOCUMENT_4.pdf');
    // await this.page.waitForSelector('.error-message', { state: 'hidden' });
    //
    // await this.buttonHelper.continueButton.click();

  }

}
