import { Page } from '@playwright/test';
import { PageHelper } from '../../../helpers/PageHelper';
import { ButtonHelper } from '../../../helpers/ButtonHelper.ts';
import claimTypes from '../../../enums/claim-types.ts';
import YesNo from '../../../enums/yesNo.ts';
import FixedRecoveryCostsBands from '../../../enums/fixedRecoveryCostsBands.ts';
import trackType from '../../../enums/track.ts';
import UnspecClaimTypes from '../../../enums/unspecClaimTypes.ts';
import LanguageSpokenAndDocuments from '../../../enums/languageSpokenAndDocuments.ts';
import { DirectionsQuestionnaire } from './DirectionsQuestionnaire.ts';
import { claimantSolicitorCredentials } from '../../../civilConfig.ts';

// The claimant's response to the defence (event CLAIMANT_RESPONSE, "View and respond to defence"). It follows every
// defendant entering a full defence, when the claim is in AWAITING_APPLICANT_INTENTION.
// proceed1 and proceed2 answer the proceed questions, which depend on the claim type:
//  - 1v1: proceed1 is the claimant's answer (proceed2 is not used)
//  - 2v1: proceed1 is Claimant 1's answer and proceed2 is Claimant 2's
//  - 1v2SS / 1v2DS: proceed1 is against Defendant 1 and proceed2 is against Defendant 2
// If nobody proceeds, civil-service sets applicantsProceedIntention to No and the response document and directions
// questionnaire (DQ) pages are not shown, so the response goes straight to the statement of truth.
export class RespondToDefence {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(
    claimType: claimTypes,
    track: trackType,
    typeOfClaim: UnspecClaimTypes,
    proceed1: YesNo = YesNo.YES,
    proceed2: YesNo = YesNo.YES,
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
    await this.pageHelper.selectNextStep('View and respond to defence');

    // Proceed with the claim. civil-service sets claimantResponseScenarioFlag from the claim type, which decides
    // which of these questions show.
    switch (claimType) {
      case claimTypes.ONE_VS_ONE:
        await this.page.locator(`#applicant1ProceedWithClaim_${proceed1}`).click();
        break;
      case claimTypes.TWO_VS_ONE:
        await this.page.locator(`#applicant1ProceedWithClaimMultiParty2v1_${proceed1}`).click();
        await this.page.locator(`#applicant2ProceedWithClaimMultiParty2v1_${proceed2}`).click();
        break;
      case claimTypes.ONE_VS_TWO_SAME_SOL:
      case claimTypes.ONE_VS_TWO_DIFF_SOL:
        await this.page.locator(`#applicant1ProceedWithClaimAgainstRespondent1MultiParty1v2_${proceed1}`).click();
        await this.page.locator(`#applicant1ProceedWithClaimAgainstRespondent2MultiParty1v2_${proceed2}`).click();
        break;
    }
    await this.pageHelper.continueToNextPage();

    // civil-service sets applicantsProceedIntention to Yes if any of the answers is Yes
    const isOneVsOne = claimType === claimTypes.ONE_VS_ONE;
    const isOneVsTwo = claimType === claimTypes.ONE_VS_TWO_SAME_SOL || claimType === claimTypes.ONE_VS_TWO_DIFF_SOL;
    const anyProceed = proceed1 === YesNo.YES || (!isOneVsOne && proceed2 === YesNo.YES);
    if (anyProceed) {
      // Response to the defence document. In a 1v2 claim the main document is only asked for when proceeding
      // against Defendant 1. A separate document for Defendant 2 is asked for when proceeding against them in a
      // 1v2 different solicitors claim, or against only them in a 1v2 same solicitor claim
      // (civil-service sets claimantResponseDocumentToDefendant2Flag).
      if (!isOneVsTwo || proceed1 === YesNo.YES) {
        await this.pageHelper.uploadFile(this.page.locator('#applicant1DefenceResponseDocument_file'), './dr-playwright/documents/TEST_DOCUMENT_3.pdf');
      }
      const isDefendant2DocumentRequired =
        proceed2 === YesNo.YES
        && (claimType === claimTypes.ONE_VS_TWO_DIFF_SOL || (claimType === claimTypes.ONE_VS_TWO_SAME_SOL && proceed1 === YesNo.NO));
      if (isDefendant2DocumentRequired) {
        await this.pageHelper.uploadFile(this.page.locator('#claimantDefenceResDocToDefendant2_file'), './dr-playwright/documents/TEST_DOCUMENT_3.pdf');
      }
      await this.pageHelper.continueToNextPage();

      // In a 2v1 claim where only Claimant 2 proceeds, Claimant 2 answers the DQ (civil-service sets
      // claimant2ResponseFlag). Otherwise Claimant 1 answers it.
      const isClaimant2Dq = claimType === claimTypes.TWO_VS_ONE && proceed1 === YesNo.NO;
      await new DirectionsQuestionnaire(this.page).complete(
        {
          fieldPrefix: isClaimant2Dq ? 'applicant2DQ' : 'applicant1DQ',
          determinationWithoutHearingField: 'deterWithoutHearing',
          label: isClaimant2Dq ? 'Claimant2' : 'Claimant1',
          hasRequestedCourt: false,
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
    await this.page.locator('input[id$="uiStatementOfTruth_name"]').fill(claimantSolicitorCredentials.name);
    await this.page.locator('input[id$="uiStatementOfTruth_role"]').fill('Solicitor');
    await this.pageHelper.continueToNextPage();

    // Check your answers and submit
    await this.buttonHelper.submitButton.click();
    await this.page.locator('#confirmation-header').waitFor({ state: 'visible' });
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
