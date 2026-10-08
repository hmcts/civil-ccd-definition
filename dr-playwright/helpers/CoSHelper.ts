import { Page } from "@playwright/test";
import claimTypes from '../enums/claim-types.ts';
import moment from 'moment-business-days';
import { EnumsHelper } from './EnumsHelper.ts';
import CoSDelivery from '../enums/CoSDelivery.ts';
import CoSLocations from '../enums/CoSLocations.ts';
import CoSLocationTypes from '../enums/CoSLocationTypes.ts';
import { ButtonHelper } from './ButtonHelper.ts';
import { PageHelper } from './PageHelper.ts';

export class CoSHelper {
  private whatDocumentsServed: string = 'Test description of documents served - LiP defendant:';
  private whoClaimWasServedTo: string = 'Test description of who the claim was served to - LiP defendant:';
  private whereDocumentsServed: string = 'Test description of where the documents were served - LiP defendant:';
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(page);
    this.pageHelper = new PageHelper(page);
  }

  // The defendants who are litigants in person, and so need a Certificate of Service, for each claim type
  static litigantInPersonDefendants(claimType: claimTypes): number[] {
    switch (claimType) {
      case claimTypes.ONE_VS_ONE_LIP:
      case claimTypes.TWO_VS_ONE_LIP:
      case claimTypes.ONE_VS_TWO_LIP_LR:
        return [1];
      case claimTypes.ONE_VS_TWO_LR_LIP:
        return [2];
      case claimTypes.ONE_VS_TWO_LIPS:
        return [1, 2];
      default:
        return [];
    }
  }

  // Claim types where no defendant has a legal representative, so Notify claim details has no document upload page
  static hasNoRepresentedDefendant(claimType: claimTypes): boolean {
    return [claimTypes.ONE_VS_ONE_LIP, claimTypes.TWO_VS_ONE_LIP, claimTypes.ONE_VS_TWO_LIPS].includes(claimType);
  }

  // Completes a Certificate of Service page for each litigant in person defendant, in defendant order
  async submit(claimType: claimTypes, event: string = 'NotifyClaim') {
    for (const defendantNumber of CoSHelper.litigantInPersonDefendants(claimType)) {
      await this.submitForDefendant(String(defendantNumber), event);
    }
  }

  private async submitForDefendant(LiPDefendantNumber: string, event: string) {
    const serveDate = moment().businessSubtract(2, 'days');
    const serviceDate = moment().businessAdd(2, 'days');

    // The date fields have the same IDs on every defendant's page, so wait for this defendant's page to show before
    // filling them. Otherwise, after Continue on defendant 1's page, the dates can go into that page while it is
    // still showing.
    const fieldPrefix = event === 'NotifyClaimDetails' ? `cos${event}${LiPDefendantNumber}` : `cos${event}Defendant${LiPDefendantNumber}`;
    await this.page.locator(`#${fieldPrefix}_cosServedDocumentFiles`).waitFor({ state: 'visible' });

    await this.pageHelper.fillDate('cosDateOfServiceForDefendant', serveDate);
    await this.pageHelper.fillDate('cosDateDeemedServedForDefendant', serviceDate);

    if (event === 'NotifyClaimDetails') {
      await this.page.locator(`#cos${event}${LiPDefendantNumber}_cosServedDocumentFiles`).fill(`${this.whatDocumentsServed} ${LiPDefendantNumber}`);
      await this.buttonHelper.addNewButton.click();
      await this.pageHelper.uploadFile(this.page.locator(`#cos${event}${LiPDefendantNumber}_cosEvidenceDocument_value`), './dr-playwright/documents/TEST_DOCUMENT_1.pdf');
      await this.page.locator(`#cos${event}${LiPDefendantNumber}_cosServedDocumentFiles`).fill(`${this.whatDocumentsServed} ${LiPDefendantNumber}`);
      await this.page.locator(`#cos${event}${LiPDefendantNumber}_cosRecipient`).fill(`${this.whoClaimWasServedTo} ${LiPDefendantNumber}`);
      await this.page.locator(`#cos${event}${LiPDefendantNumber}_cosRecipientServeType`).selectOption(await EnumsHelper.randomEnumValue(CoSDelivery));
      await this.page.locator(`#cos${event}${LiPDefendantNumber}_cosRecipientServeLocation`).fill(`${this.whereDocumentsServed} ${LiPDefendantNumber}`);
      await this.page.locator(`#cos${event}${LiPDefendantNumber}_cosRecipientServeLocationOwnerType-` + await EnumsHelper.randomEnumValue(CoSLocations)).check();
      await this.page.locator(`#cos${event}${LiPDefendantNumber}_cosRecipientServeLocationType`).selectOption(await EnumsHelper.randomEnumValue(CoSLocationTypes));
      await this.page.locator(`#cos${event}${LiPDefendantNumber}_cosSender`).fill(`Legal Rep Name: Defendant${LiPDefendantNumber}`);
      await this.page.locator(`#cos${event}${LiPDefendantNumber}_cosSenderFirm`).fill(`Legal Rep Firm: Defendant${LiPDefendantNumber}`);
      await this.page.locator(`#cos${event}${LiPDefendantNumber}_cosUISenderStatementOfTruthLabel-CERTIFIED`).check();
    } else {
      await this.page.locator(`#cos${event}Defendant${LiPDefendantNumber}_cosServedDocumentFiles`).fill(`${this.whatDocumentsServed} ${LiPDefendantNumber}`);
      await this.page.locator(`#cos${event}Defendant${LiPDefendantNumber}_cosRecipient`).fill(`${this.whoClaimWasServedTo} ${LiPDefendantNumber}`);
      await this.page.locator(`#cos${event}Defendant${LiPDefendantNumber}_cosRecipientServeType`).selectOption(await EnumsHelper.randomEnumValue(CoSDelivery));
      await this.page.locator(`#cos${event}Defendant${LiPDefendantNumber}_cosRecipientServeLocation`).fill(`${this.whereDocumentsServed} ${LiPDefendantNumber}`);
      await this.page.locator(`#cos${event}Defendant${LiPDefendantNumber}_cosRecipientServeLocationOwnerType-` + await EnumsHelper.randomEnumValue(CoSLocations)).check();
      await this.page.locator(`#cos${event}Defendant${LiPDefendantNumber}_cosRecipientServeLocationType`).selectOption(await EnumsHelper.randomEnumValue(CoSLocationTypes));
      await this.page.locator(`#cos${event}Defendant${LiPDefendantNumber}_cosSender`).fill(`Legal Rep Name: Defendant${LiPDefendantNumber}`);
      await this.page.locator(`#cos${event}Defendant${LiPDefendantNumber}_cosSenderFirm`).fill(`Legal Rep Firm: Defendant${LiPDefendantNumber}`);
      await this.page.locator(`#cos${event}Defendant${LiPDefendantNumber}_cosUISenderStatementOfTruthLabel-CERTIFIED`).check();
    }
    await this.buttonHelper.continueButton.click();
  }
}
