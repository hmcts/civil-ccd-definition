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

          // Both goes straight to the Upload page; a single defendant raises a warning first
          if (whomToNotify !== notifyClaimOptions.BOTH) {
            await this.buttonHelper.IgnoreWarningAndContinueButton.click();
          }

          await this.uploadNotifyClaimDetailsDocs();
          await this.buttonHelper.continueButton.click();
          await this.buttonHelper.submitButton.click();
          break;
        }
      }
    } else if (CoSHelper.hasNoRepresentedDefendant(claimType)) {
      // With no represented defendant there is no document upload page, so it goes straight to the Certificate(s)
      // of Service, which hold their own evidence upload
      await new CoSHelper(this.page).submit(claimType, 'NotifyClaimDetails');
      await this.buttonHelper.submitButton.click();
    } else {
      await this.uploadNotifyClaimDetailsDocs();
      await this.buttonHelper.continueButton.click();
      // Any litigant in person defendant also needs a Certificate of Service page completing
      if (CoSHelper.litigantInPersonDefendants(claimType).length > 0) {
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

    // Each upload goes through uploadFile, which waits for it to finish and uploads again if the document store
    // rate limits it
    for (const [addNewButtonIndex, documentType] of documentsMap.entries()) {
      await this.page.locator(`:nth-match(:text("Add new"), ${addNewButtonIndex})`).click();
      if (documentType === 'particularsOfClaim') {
        await this.pageHelper.uploadFile(
          this.page.locator(`#servedDocumentFiles_${documentType}Document_value`),
          './dr-playwright/documents/TEST_DOCUMENT_1.pdf',
        );
      } else {
        await this.pageHelper.uploadFile(
          this.page.locator(`#servedDocumentFiles_${documentType}_0_document`),
          './dr-playwright/documents/TEST_DOCUMENT_2.pdf',
        );
      }
    }
  }
}
