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
import moment from 'moment-business-days';
import { courts } from '../../../fixtures/courts.ts';
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
    await this.buttonHelper.continueButton.click(); // Confirm Details

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
        await this.page.locator(`#respondent1ClaimResponseType-${respondent1Response}`).click();
        await this.page.locator(`#respondent1ClaimResponseTypeApplicant2-${respondent2Response}`).click();
        break;
      case claimTypes.ONE_VS_TWO_SAME_SOL:
        await this.page.locator(`#respondent1ClaimResponseType-${respondent1Response}`).click();
        await this.page.locator(`#respondent2ClaimResponseType-${respondent2Response}`).click();
        break;
    }
    await this.buttonHelper.continueButton.click();

    // Solicitor reference
    let legalRepresentativeReference: string;
    if (defendantNumber === 1) {
      legalRepresentativeReference = await this.page.locator('#solicitorReferences_respondentSolicitor1Reference').inputValue();
      await this.page.locator('#solicitorReferences_respondentSolicitor1Reference').fill(`${legalRepresentativeReference} Respond to claim`);
    } else {
      legalRepresentativeReference = await this.page.locator('#respondentSolicitor2Reference').inputValue();
      await this.page.locator('#respondentSolicitor2Reference').fill(`${legalRepresentativeReference} - Respond to claim`);
    }
    await this.buttonHelper.continueButton.click();

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
      await this.pageHelper.uploadFile(this.page.locator(`#respondent${defendantNumber}ClaimResponseDocument_file`), './dr-playwright/documents/TEST_DOCUMENT_3.pdf');
      await this.buttonHelper.continueButton.click();
    }

    if (isFullDefence) {
      await this.completeDirectionsQuestionnaire(
        track,
        typeOfClaim,
        defendantNumber,
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
      );
    }

    // Statement of truth
    await this.page.locator('input[id$="uiStatementOfTruth_name"]').fill((defendantNumber === 1 ? respondent1SolicitorCredentials : respondent2SolicitorCredentials).name);
    await this.page.locator('input[id$="uiStatementOfTruth_role"]').fill('Solicitor');
    await this.buttonHelper.continueButton.click();

    // Check your answers and submit
    await this.buttonHelper.submitButton.click();
    await this.page.locator('#confirmation-header').waitFor({ state: 'visible' });
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }

  private async completeDirectionsQuestionnaire(
    track: trackType,
    typeOfClaim: UnspecClaimTypes,
    defendantNumber: number,
    determinationWithoutHearing: YesNo,
    oneMonthStay: YesNo,
    preActionProtocol: YesNo,
    fixedRecoverableCosts: YesNo,
    fixedRecoverableCostsBand: FixedRecoveryCostsBands,
    disclosure: YesNo,
    noOfExperts: number,
    noOfWitnesses: number,
    language: LanguageSpokenAndDocuments,
    unavailableDatesRequired: YesNo,
  ) {
    if (track === trackType.SMALL) {
      // Determination without hearing (small claims only)
      await this.page.locator(`#deterWithoutHearingRespondent${defendantNumber}_deterWithoutHearingYesNo_${determinationWithoutHearing}`).click();
      if (determinationWithoutHearing === YesNo.NO) {
        await this.page.locator(`#deterWithoutHearingRespondent${defendantNumber}_deterWithoutHearingWhyNot`).fill(`Defendant${defendantNumber} reason why the claim is not suitable for determination without a hearing.`);
      }
      await this.buttonHelper.continueButton.click();
    } else {
      // File directions questionnaire (not shown for small claims)
      await this.page.locator(`#respondent${defendantNumber}DQFileDirectionsQuestionnaire_explainedToClient-CONFIRM`).click();
      await this.page.locator(`#respondent${defendantNumber}DQFileDirectionsQuestionnaire_oneMonthStayRequested_${oneMonthStay}`).click();
      await this.page.locator(`#respondent${defendantNumber}DQFileDirectionsQuestionnaire_reactionProtocolCompliedWith_${preActionProtocol}`).click();

      if (preActionProtocol === YesNo.NO) {
        await this.page.locator(`#respondent${defendantNumber}DQFileDirectionsQuestionnaire_reactionProtocolNotCompliedWithReason`).fill('Pre-action protocol explanation');
      }
      await this.buttonHelper.continueButton.click();

      // Fixed Recoverable Costs (fast and intermediate tracks)
      if (track === trackType.FAST) {
        await this.page.locator(`#respondent${defendantNumber}DQFixedRecoverableCosts_isSubjectToFixedRecoverableCostRegime_${fixedRecoverableCosts}`).click();
        if (fixedRecoverableCosts === YesNo.YES) {
          await this.page.locator(`#respondent${defendantNumber}DQFixedRecoverableCosts_band-${fixedRecoverableCostsBand}`).click();
          await this.page.locator(`#respondent${defendantNumber}DQFixedRecoverableCosts_complexityBandingAgreed_${fixedRecoverableCosts}`).click();
        }
        await this.page.locator(`#respondent${defendantNumber}DQFixedRecoverableCosts_reasons`).fill('Fixed Recoverable Costs explanation');
        await this.buttonHelper.continueButton.click();
      } else if (track === trackType.INTERMEDIATE) {
        await this.completeIntermediateFixedRecoverableCosts(defendantNumber, fixedRecoverableCosts, fixedRecoverableCostsBand);
      }

      // Disclosure of electronic documents (intermediate and multi tracks only)
      const isIntermediateOrMulti = track === trackType.INTERMEDIATE || track === trackType.MULTI;
      if (isIntermediateOrMulti) {
        await this.page.locator(`#respondent${defendantNumber}DQDisclosureOfElectronicDocuments_reachedAgreement_No`).click();
        await this.page.locator(`#respondent${defendantNumber}DQDisclosureOfElectronicDocuments_agreementLikely_No`).click();
        await this.page.locator(`#respondent${defendantNumber}DQDisclosureOfElectronicDocuments_reasonForNoAgreement`).fill('Reason no agreement on electronic disclosure is likely.');
        await this.buttonHelper.continueButton.click();
      }

      // Disclosure Non-Electronic Documents (not shown for small claims)
      await this.page.locator(`#respondent${defendantNumber}DQDisclosureOfNonElectronicDocuments_directionsForDisclosureProposed_${disclosure}`).click();
      if (disclosure === YesNo.YES) {
        await this.page.locator(`#respondent${defendantNumber}DQDisclosureOfNonElectronicDocuments_standardDirectionsRequired_No`).click();
        await this.page.locator(`#respondent${defendantNumber}DQDisclosureOfNonElectronicDocuments_bespokeDirections`).fill('Bespoke directions text.');
      }
      await this.buttonHelper.continueButton.click();

      // Disclosure report (intermediate and multi tracks only, not for personal injury claims)
      if (isIntermediateOrMulti && typeOfClaim !== UnspecClaimTypes.PERSONAL_INJURY) {
        await this.page.locator(`#respondent${defendantNumber}DQDisclosureReport_disclosureFormFiledAndServed_Yes`).click();
        await this.page.locator(`#respondent${defendantNumber}DQDisclosureReport_disclosureProposalAgreed_Yes`).click();
        await this.page.locator(`#respondent${defendantNumber}DQDisclosureReport_draftOrderNumber`).fill('123');
        await this.buttonHelper.continueButton.click();
      }
    }

    // Experts
    const expertRequired = noOfExperts >= 1 ? YesNo.YES : YesNo.NO;
    await this.page.locator(`#respondent${defendantNumber}DQExperts_expertRequired_${expertRequired}`).click();
    if (expertRequired === YesNo.YES) {
      await this.page.locator(`#respondent${defendantNumber}DQExperts_expertReportsSent-YES`).click();
      await this.page.locator(`#respondent${defendantNumber}DQExperts_jointExpertSuitable_No`).click();

      for (let i = 0; i < noOfExperts; i++) {
        await this.buttonHelper.addNewButton.first().click();
        await this.page.locator(`#respondent${defendantNumber}DQExperts_details_${i}_firstName`).fill(`Expert${i + 1}Firstname`);
        await this.page.locator(`#respondent${defendantNumber}DQExperts_details_${i}_lastName`).fill(`Expert${i + 1}Lastname`);
        await this.page.locator(`#respondent${defendantNumber}DQExperts_details_${i}_emailAddress`).fill(`expert${i + 1}@example.com`);
        await this.page.locator(`#respondent${defendantNumber}DQExperts_details_${i}_phoneNumber`).fill('07700900000');
        await this.page.locator(`#respondent${defendantNumber}DQExperts_details_${i}_fieldOfExpertise`).fill(`Expert${i + 1}: Test field of expertise`);
        await this.page.locator(`#respondent${defendantNumber}DQExperts_details_${i}_whyRequired`).fill(`Expert${i + 1}: Test reason why this expert is required.`);
        await this.page.locator(`#respondent${defendantNumber}DQExperts_details_${i}_estimatedCost`).fill('500');
      }
    }
    await this.buttonHelper.continueButton.click();

    // Witnesses
    const witnessesRequired = noOfWitnesses >= 1 ? YesNo.YES : YesNo.NO;
    await this.page.locator(`#respondent${defendantNumber}DQWitnesses_witnessesToAppear_${witnessesRequired}`).click();
    if (witnessesRequired === YesNo.YES) {
      for (let i = 0; i < noOfWitnesses; i++) {
        await this.buttonHelper.addNewButton.first().click();
        await this.page.locator(`#respondent${defendantNumber}DQWitnesses_details_${i}_firstName`).fill(`Witness${i + 1}Firstname`);
        await this.page.locator(`#respondent${defendantNumber}DQWitnesses_details_${i}_lastName`).fill(`Witness${i + 1}Lastname`);
        await this.page.locator(`#respondent${defendantNumber}DQWitnesses_details_${i}_emailAddress`).fill(`witness${i + 1}@example.com`);
        await this.page.locator(`#respondent${defendantNumber}DQWitnesses_details_${i}_phoneNumber`).fill('07700900000');
        await this.page.locator(`#respondent${defendantNumber}DQWitnesses_details_${i}_reasonForWitness`).fill(`Witness${i + 1}: Test event witnessed.`);
      }
    }
    await this.buttonHelper.continueButton.click();

    // Court - spoken language and document language
    await this.page.locator(`#respondent${defendantNumber}DQLanguage_court-${language}`).click();
    await this.page.locator(`#respondent${defendantNumber}DQLanguage_documents-${language}`).click();
    await this.buttonHelper.continueButton.click();

    // Hearing availability
    await this.page.locator(`#respondent${defendantNumber}DQHearing_unavailableDatesRequired_${unavailableDatesRequired}`).click();
    if (unavailableDatesRequired === YesNo.YES) {
      // Single date
      await this.buttonHelper.addNewButton.first().click();
      await this.page.locator(`#respondent${defendantNumber}DQHearing_unavailableDates_0_unavailableDateType-SINGLE_DATE`).click();
      await this.pageHelper.fillDate('date', moment().add(6, 'months'));

      // Date range
      await this.buttonHelper.addNewButton.first().click();
      await this.page.locator(`#respondent${defendantNumber}DQHearing_unavailableDates_1_unavailableDateType-DATE_RANGE`).click();
      await this.pageHelper.fillDate('fromDate', moment().add(7, 'months'));
      await this.pageHelper.fillDate('toDate', moment().add(7, 'months').add(5, 'days'));
    }
    const draftDirections = this.page.locator(`#respondent${defendantNumber}DQDraftDirections`);
    await this.pageHelper.continueUntilVisible(draftDirections);

    // Draft directions
    await this.pageHelper.uploadFile(draftDirections, './dr-playwright/documents/TEST_DOCUMENT_4.pdf');
    await this.buttonHelper.continueButton.click();

    // Court location and remote hearing
    await this.page.locator(`#respondent${defendantNumber}DQRequestedCourt_responseCourtLocations`).selectOption(courts.clerkenwell.longAddress);
    await this.page.locator(`#respondent${defendantNumber}DQRequestedCourt_reasonForHearingAtSpecificCourt`).fill('Reason for hearing at specific court.');
    await this.page.locator(`#respondent${defendantNumber}DQRemoteHearing_remoteHearingRequested_Yes`).click();
    await this.page.locator(`#respondent${defendantNumber}DQRemoteHearing_reasonForRemoteHearing`).fill('Reason for remote hearing.');
    await this.buttonHelper.continueButton.click();

    // Hearing support
    await this.page.locator(`#respondent${defendantNumber}DQHearingSupport_supportRequirements_Yes`).click();
    await this.page.locator(`#respondent${defendantNumber}DQHearingSupport_supportRequirementsAdditional`).fill('Hearing support requirements.');
    await this.buttonHelper.continueButton.click();

    // Vulnerability questions
    await this.page.locator(`#respondent${defendantNumber}DQVulnerabilityQuestions_vulnerabilityAdjustmentsRequired_Yes`).click();
    await this.page.locator(`#respondent${defendantNumber}DQVulnerabilityQuestions_vulnerabilityAdjustments`).fill('Vulnerability adjustments required.');
    await this.buttonHelper.continueButton.click();

    // Further information
    await this.page.locator(`#respondent${defendantNumber}DQFurtherInformation_futureApplications_Yes`).click();
    await this.page.locator(`#respondent${defendantNumber}DQFurtherInformation_reasonForFutureApplications`).fill('Reason for future applications.');
    await this.page.locator(`#respondent${defendantNumber}DQFurtherInformation_otherInformationForJudge`).fill('Other information for the judge.');
    await this.buttonHelper.continueButton.click();
  }

  // The intermediate track fields only exist when the MINTI definition is deployed. Without it the page still shows
  // (its page condition allows intermediate claims) but has nothing to fill in, so it is just continued.
  private async completeIntermediateFixedRecoverableCosts(
    defendantNumber: number,
    fixedRecoverableCosts: YesNo,
    fixedRecoverableCostsBand: FixedRecoveryCostsBands,
  ) {
    await this.page.waitForURL(/FixedRecoverableCosts/);
    const fieldPrefix = `#respondent${defendantNumber}DQFixedRecoverableCostsIntermediate`;
    const regimeRadio = this.page.locator(`${fieldPrefix}_isSubjectToFixedRecoverableCostRegime_${fixedRecoverableCosts}`);
    const hasIntermediateFields = await regimeRadio
      .waitFor({ state: 'visible', timeout: 5000 })
      .then(() => true, () => false);
    if (hasIntermediateFields) {
      await regimeRadio.click();
      if (fixedRecoverableCosts === YesNo.YES) {
        await this.page.locator(`${fieldPrefix}_band-${fixedRecoverableCostsBand}`).click();
        await this.page.locator(`${fieldPrefix}_complexityBandingAgreed_${fixedRecoverableCosts}`).click();
      }
      await this.page.locator(`${fieldPrefix}_reasons`).fill('Fixed Recoverable Costs explanation');
    }
    await this.buttonHelper.continueButton.click();
  }
}
