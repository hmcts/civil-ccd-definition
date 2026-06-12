import { Page } from "@playwright/test";
import claimTypes from '../enums/claim-types.ts';
import moment from 'moment-business-days';
import { EnumsHelper } from './EnumsHelper.ts';
import CoSDelivery from '../enums/CoSDelivery.ts';
import CoSLocations from '../enums/CoSLocations.ts';
import CoSLocationTypes from '../enums/CoSLocationTypes.ts';
import { ButtonHelper } from './ButtonHelper.ts';

export class CoSHelper {
  private whatDocumentsServed: string = 'Test description of documents served - LiP defendant:';
  private whoClaimWasServedTo: string = 'Test description of who the claim was served to - LiP defendant:';
  private whereDocumentsServed: string = 'Test description of where the documents were served - LiP defendant:';
  private buttonHelper: ButtonHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(page);
  }

  async submit(claimType: claimTypes, event:string = 'NotifyClaim' ) {
    const serveDate = moment().businessSubtract(2, 'days');
    const serviceDate = moment().businessAdd(2, 'days');
    let LiPDefendantNumber: string = '1';

    await this.page.locator('#cosDateOfServiceForDefendant-day').fill(serveDate.date().toString());
    await this.page.locator('#cosDateOfServiceForDefendant-month').fill((serveDate.month() + 1).toString());
    await this.page.locator('#cosDateOfServiceForDefendant-year').fill(serveDate.year().toString());

    await this.page.locator('#cosDateDeemedServedForDefendant-day').fill(serviceDate.date().toString());
    await this.page.locator('#cosDateDeemedServedForDefendant-month').fill((serviceDate.month() + 1).toString());
    await this.page.locator('#cosDateDeemedServedForDefendant-year').fill(serviceDate.year().toString());

    claimType === claimTypes.ONE_VS_TWO_LIP_LR ? LiPDefendantNumber = '1' : LiPDefendantNumber = '2';

    if (event === 'NotifyClaimDetails') {
      await this.page.locator(`#cos${event}${LiPDefendantNumber}_cosServedDocumentFiles`).fill(`${this.whatDocumentsServed} ${LiPDefendantNumber}`);
      await this.buttonHelper.addNewButton.click();
      await this.page.locator(`#cos${event}${LiPDefendantNumber}_cosEvidenceDocument_value`).setInputFiles('./dr-playwright/documents/TEST_DOCUMENT_1.pdf');
      await this.page.waitForSelector('.error-message', { state: 'hidden' });
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
