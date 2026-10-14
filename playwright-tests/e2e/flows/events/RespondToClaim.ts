import { Page } from '@playwright/test';
import { PageHelper } from '../../../helpers/PageHelper';
import { ButtonHelper } from '../../../helpers/ButtonHelper.ts';
import claimTypes from '../../../enums/claim-types.ts';
import RespondentResponses from '../../../enums/RespondentResponses.ts';
import YesNo from '../../../enums/yesNo.ts';
import FixedRecoveryCostsBands from '../../../enums/fixedRecoveryCostsBands.ts';
import trackType from '../../../enums/track.ts';
import UnspecClaimTypes from '../../../enums/unspecClaimTypes.ts';
import LanguageSpokenAndDocuments from '../../../enums/languageSpokenAndDocuments.ts';
import { DirectionsQuestionnaire } from './DirectionsQuestionnaire.ts';
import {
  respondent1SolicitorCredentials,
  respondent2SolicitorCredentials,
} from '../../../civilConfig.ts';

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
    track: trackType,
    typeOfClaim: UnspecClaimTypes,
    respondent1Response: RespondentResponses = RespondentResponses.FULL_DEFENCE,
    respondent2Response: RespondentResponses = RespondentResponses.FULL_DEFENCE,
    defendantNumber: number = 1,
    determinationWithoutHearing: YesNo = YesNo.NO,
    oneMonthStay: YesNo = YesNo.YES,
    preActionProtocol: YesNo = YesNo.NO,
    fixedRecoverableCosts: YesNo = YesNo.NO,
    fixedRecoverableCostsBand: FixedRecoveryCostsBands = FixedRecoveryCostsBands.BAND1,
    disclosure: YesNo = YesNo.YES,
    noOfExperts: number = 0,
    noOfWitnesses: number = 0,
    language: LanguageSpokenAndDocuments = LanguageSpokenAndDocuments.ENGLISH,
    unavailableDatesRequired: YesNo = YesNo.NO,
  ) {
    await this.pageHelper.selectNextStep('Respond to claim');
    await this.pageHelper.continueToNextPage(); // Confirm Details

    // Single response (1v2 same solicitor only): one response for both defendants, or a separate response for each.
    // civil-service rejects separate responses that are both full defence, so those must be a single response.
    const isSingleResponse = respondent1Response === respondent2Response;
    if (claimType === claimTypes.ONE_VS_TWO_SAME_SOL) {
      await this.page.locator(`#respondentResponseIsSame_${isSingleResponse ? YesNo.YES : YesNo.NO}`).click();
      await this.pageHelper.continueToNextPage();
    }

    // Response
    switch (claimType) {
      case claimTypes.ONE_VS_ONE:
      case claimTypes.ONE_VS_TWO_DIFF_SOL:
      case claimTypes.ONE_VS_TWO_LR_LIP:
      case claimTypes.ONE_VS_TWO_LIP_LR: {
        // Each defendant's solicitor responds separately and only sees their own defendant's response field,
        // e.g. in a 1v2 different solicitors claim Defendant 2's solicitor answers respondent2ClaimResponseType.
        const responseTypeLocator =
          defendantNumber === 1
            ? `#respondent1ClaimResponseType-${respondent1Response}`
            : `#respondent2ClaimResponseType-${respondent2Response}`;
        console.log(responseTypeLocator);
        await this.page.locator(responseTypeLocator).click();
        break;
      }
      case claimTypes.TWO_VS_ONE:
        // The one defendant responds to each claimant separately: respondent2Response is their response to Claimant 2
        await this.page.locator(`#respondent1ClaimResponseType-${respondent1Response}`).click();
        await this.page.locator(`#respondent1ClaimResponseTypeToApplicant2-${respondent2Response}`).click();
        break;
      case claimTypes.ONE_VS_TWO_SAME_SOL:
        // With a single response only Defendant 1's response field shows, and it applies to both defendants
        await this.page.locator(`#respondent1ClaimResponseType-${respondent1Response}`).click();
        if (!isSingleResponse) {
          await this.page.locator(`#respondent2ClaimResponseType-${respondent2Response}`).click();
        }
        break;
    }
    await this.pageHelper.continueToNextPage();

    // Solicitor reference
    let legalRepresentativeReference: string;
    if (defendantNumber === 1) {
      legalRepresentativeReference = await this.page.locator('#solicitorReferences_respondentSolicitor1Reference').inputValue();
      await this.page.locator('#solicitorReferences_respondentSolicitor1Reference').fill(`${legalRepresentativeReference} Respond to claim`);
    } else {
      legalRepresentativeReference = await this.page.locator('#respondentSolicitor2Reference').inputValue();
      await this.page.locator('#respondentSolicitor2Reference').fill(`${legalRepresentativeReference} - Respond to claim`);
    }
    await this.pageHelper.continueToNextPage();

    // Which pages follow depends on this defendant's response (set by civil-service as multiPartyResponseTypeFlags):
    // the response document is only asked for a full defence or part admission, and the directions questionnaire
    // only for a full defence. A full admission or counterclaim goes straight to the statement of truth.
    // Only 1v1 and 1v2 different solicitors have the non-full-defence paths coded; other claim types assume a full defence.
    const ownResponse = defendantNumber === 1 ? respondent1Response : respondent2Response;
    const hasNonFullDefencePaths = [claimTypes.ONE_VS_ONE, claimTypes.ONE_VS_TWO_DIFF_SOL].includes(claimType);
    const isFullDefence = !hasNonFullDefencePaths || ownResponse === RespondentResponses.FULL_DEFENCE;
    const isResponseDocumentRequired = isFullDefence || ownResponse === RespondentResponses.PART_ADMISSION;

    // Response document
    if (isResponseDocumentRequired) {
      await this.pageHelper.uploadFile(this.page.locator(`#respondent${defendantNumber}ClaimResponseDocument_file`), './playwright-tests/documents/TEST_DOCUMENT_3.pdf');
      await this.pageHelper.continueToNextPage();
    }

    if (isFullDefence) {
      await new DirectionsQuestionnaire(this.page).complete(
        {
          fieldPrefix: `respondent${defendantNumber}DQ`,
          determinationWithoutHearingField: `deterWithoutHearingRespondent${defendantNumber}`,
          label: `Defendant${defendantNumber}`,
          hasRequestedCourt: true,
        },
        track,
        typeOfClaim,
        {
          determinationWithoutHearing,
          oneMonthStay,
          preActionProtocol,
          fixedRecoverableCosts,
          fixedRecoverableCostsBand,
          disclosure,
          noOfExperts,
          noOfWitnesses,
          language,
          unavailableDatesRequired,
        },
      );
    }

    // Statement of truth
    await this.page.locator('input[id$="uiStatementOfTruth_name"]').fill((defendantNumber === 1 ? respondent1SolicitorCredentials : respondent2SolicitorCredentials).name);
    await this.page.locator('input[id$="uiStatementOfTruth_role"]').fill('Solicitor');
    await this.pageHelper.continueToNextPage();

    // Check your answers and submit
    await this.pageHelper.submitEvent();
    await this.page.locator('#confirmation-header').waitFor({ state: 'visible' });
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
