import { Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import claimTypes from '../../../../enums/claim-types.ts';
import { partyDetails } from '../../../../fixtures/partyDetails.ts';
import ResponseIntention from '../../../../enums/ResponseIntention.ts';

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

  async acknowledge(
    claimType: claimTypes,
    respondent1ResponseIntention: ResponseIntention = ResponseIntention.FULL_DEFENCE,
    respondent2ResponseIntention: ResponseIntention,
    defendantNumber: number = 1,
    defendantType: string = 'INDIVIDUAL',
  ) {
    let legalRepresentativeReference: string;
    await this.pageHelper.selectNextStep('Acknowledge claim');

    // The defendant confirms their details. A date of birth is asked for an individual or a sole trader (their own
    // field each), and not for a company or an organisation.
    const dateOfBirthField = { INDIVIDUAL: 'individualDateOfBirth', SOLE_TRADER: 'soleTraderDateOfBirth' }[defendantType];
    if (claimType !== claimTypes.ONE_VS_TWO_LIP_LR && dateOfBirthField) {
      // remove the claim type check when DTSCCI-672 is merged
      // A solicitor representing both defendants confirms both defendants' details, so each date of birth showing is
      // filled in
      const days = this.page.locator(`#${dateOfBirthField}-day`);
      await days.first().waitFor({ state: 'visible' });
      for (let i = 0; i < await days.count(); i++) {
        await days.nth(i).fill(partyDetails.defendant1.DOB_day);
        await this.page.locator(`#${dateOfBirthField}-month`).nth(i).fill(partyDetails.defendant1.DOB_month);
        await this.page.locator(`#${dateOfBirthField}-year`).nth(i).fill(partyDetails.defendant1.DOB_year);
      }
    }
    await this.pageHelper.continueToNextPage();

    switch (claimType) {
      case claimTypes.ONE_VS_ONE:
      case claimTypes.ONE_VS_TWO_DIFF_SOL:
      case claimTypes.ONE_VS_TWO_LR_LIP:
      case claimTypes.ONE_VS_TWO_LIP_LR:
        if (defendantNumber === 1) {
          await this.page
            .locator(`#respondent1ClaimResponseIntentionType-${respondent1ResponseIntention}`)
            .click();
        } else {
          await this.page
            .locator(`#respondent2ClaimResponseIntentionType-${respondent2ResponseIntention}`)
            .click();
        }
        break;
      case claimTypes.TWO_VS_ONE:
        await this.page
          .locator(`#respondent1ClaimResponseIntentionType-${respondent1ResponseIntention}`)
          .click();
        await this.page
          .locator(
            `#respondent1ClaimResponseIntentionTypeApplicant2-${respondent2ResponseIntention}`,
          )
          .click();
        break;
      case claimTypes.ONE_VS_TWO_SAME_SOL:
        await this.page
          .locator(`#respondent1ClaimResponseIntentionType-${respondent1ResponseIntention}`)
          .click();
        await this.page
          .locator(`#respondent2ClaimResponseIntentionType-${respondent2ResponseIntention}`)
          .click();
        break;
    }

    await this.pageHelper.continueToNextPage();

    if (defendantNumber === 1) {
      legalRepresentativeReference = await this.page
        .locator('#solicitorReferences_respondentSolicitor1Reference')
        .inputValue();
      await this.page
        .locator('#solicitorReferences_respondentSolicitor1Reference')
        .fill(`${legalRepresentativeReference} acknowledge claim`);
    } else if (claimType !== claimTypes.ONE_VS_TWO_LIP_LR) {
      // The CCD definition only shows Defendant 2's reference when respondent2SameLegalRepresentative is No. In a
      // 1v2LIPLR claim that question is never asked (Defendant 1 is a LiP), so the page has no fields to fill.
      legalRepresentativeReference = await this.page
        .locator('#respondentSolicitor2Reference')
        .inputValue();
      await this.page
        .locator('#respondentSolicitor2Reference')
        .fill(`${legalRepresentativeReference} acknowledge claim`);
    }

    await this.pageHelper.continueToNextPage();
    await this.pageHelper.submitEvent('Acknowledge claim');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
