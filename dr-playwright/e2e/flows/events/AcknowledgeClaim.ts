import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../helpers/PageHelper';
import { ButtonHelper } from '../../../helpers/ButtonHelper.ts';
import claimTypes from '../../../enums/claim-types.ts';
import notifyClaimOptions from '../../../enums/notifyClaimOptions.ts';
import moment from 'moment-business-days';
import CoSDelivery from '../../../enums/CoSDelivery.ts';
import { EnumsHelper } from '../../../helpers/EnumsHelper.ts';
import CoSLocations from '../../../enums/CoSLocations.ts';
import CoSLocationTypes from '../../../enums/CoSLocationTypes.ts';
import { CoSHelper } from '../../../helpers/CoSHelper.ts';
import { partyDetails } from '../../../fixtures/partyDetails.ts';
import ResponseIntention from '../../../enums/ResponseIntention.ts';

export class AcknowledgeClaim {

  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  // private whatDocumentsServed: string = 'Test description of documents served - LiP defendant:';
  // private whoClaimWasServedTo: string = 'Test description of who the claim was served to - LiP defendant:';
  // private whereDocumentsServed: string = 'Test description of where the documents were served - LiP defendant:';
  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async acknowledge(claimType: claimTypes, responseIntention: ResponseIntention) {
    const acknowledgeClaimButton = this.page.getByRole('button', { name: 'Acknowledge claim'});
    let legalRepresentativeReference: string;
    await this.pageHelper.selectNextStep('Acknowledge claim');

    await this.page.locator('#individualDateOfBirth-day').fill(partyDetails.defendant1.DOB_day);
    await this.page.locator('#individualDateOfBirth-month').fill(partyDetails.defendant1.DOB_month);
    await this.page.locator('#individualDateOfBirth-year').fill(partyDetails.defendant1.DOB_year);
    await this.buttonHelper.continueButton.click();

    await this.page.locator(`#respondent1ClaimResponseIntentionType-${responseIntention}`).click();
    await this.buttonHelper.continueButton.click();
    legalRepresentativeReference =  await this.page.locator('#solicitorReferences_respondentSolicitor1Reference').innerText();
    await this.page.locator('#solicitorReferences_respondentSolicitor1Reference').fill(`${legalRepresentativeReference} - acknowledge claim`);
    await this.buttonHelper.continueButton.click();
    await acknowledgeClaimButton.click();

    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  };

}
