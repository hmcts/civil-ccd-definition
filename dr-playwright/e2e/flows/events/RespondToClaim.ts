import { Page } from '@playwright/test';
import { PageHelper } from '../../../helpers/PageHelper';
import { ButtonHelper } from '../../../helpers/ButtonHelper.ts';
import claimTypes from '../../../enums/claim-types.ts';
import RespondentResponses from '../../../enums/RespondentResponses.ts';

export class RespondToClaim {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  // private whatDocumentsServed: string = 'Test description of documents served - LiP defendant:';
  // private whoClaimWasServedTo: string = 'Test description of who the claim was served to - LiP defendant:';
  // private whereDocumentsServed: string = 'Test description of where the documents were served - LiP defendant:';
  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(
    claimType: claimTypes,
    respondent1Response: RespondentResponses = RespondentResponses.FULL_DEFENCE,
    respondent2Response: RespondentResponses = RespondentResponses.FULL_DEFENCE,
    defendantNumber: number = 1,
  ) {
    await this.pageHelper.selectNextStep('Respond to claim');
    await this.buttonHelper.continueButton.click(); // Confirm Details

    switch (claimType) {
      case claimTypes.ONE_VS_ONE:
      case claimTypes.ONE_VS_TWO_DIFF_SOL:
      case claimTypes.ONE_VS_TWO_LR_LIP:
      case claimTypes.ONE_VS_TWO_LIP_LR:
        console.log(`#respondent1ClaimResponseType-${respondent1Response}`);
        if (defendantNumber === 1) {
          await this.page.locator(`#respondent1ClaimResponseType-${respondent1Response}`).click();
        } else {
          await this.page.locator(`#respondent2ClaimResponseType-${respondent2Response}`).click();
        }
        break;
      case claimTypes.TWO_VS_ONE:
        await this.page.locator(`#respondent1ClaimResponseType-${respondent1Response}`).click();
        await this.page
          .locator(`#respondent1ClaimResponseTypeApplicant2-${respondent2Response}`)
          .click();
        break;
      case claimTypes.ONE_VS_TWO_SAME_SOL:
        await this.page.locator(`#respondent1ClaimResponseType-${respondent1Response}`).click();
        await this.page.locator(`#respondent2ClaimResponseType-${respondent2Response}`).click();
        break;
    }

    let legalRepresentativeReference: string;
    if (defendantNumber === 1) {
      legalRepresentativeReference = await this.page
        .locator('#solicitorReferences_respondentSolicitor1Reference')
        .innerText();
      await this.page
        .locator('#solicitorReferences_respondentSolicitor1Reference')
        .fill(`${legalRepresentativeReference} Respond to claim`);
    } else {
      legalRepresentativeReference = await this.page
        .locator('#respondentSolicitor2Reference')
        .innerText();
      await this.page
        .locator('#respondentSolicitor2Reference')
        .fill(`${legalRepresentativeReference} - acknowledge claim`);
    }
  }
}
