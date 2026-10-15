import { Page } from '@playwright/test';
import { PageHelper } from '../../../helpers/PageHelper';
import { ButtonHelper } from '../../../helpers/ButtonHelper.ts';
import YesNo from '../../../enums/yesNo.ts';
import FixedRecoveryCostsBands from '../../../enums/fixedRecoveryCostsBands.ts';
import trackType from '../../../enums/track.ts';
import UnspecClaimTypes from '../../../enums/unspecClaimTypes.ts';
import LanguageSpokenAndDocuments from '../../../enums/languageSpokenAndDocuments.ts';
import moment from 'moment-business-days';
import { courts } from '../../../fixtures/courts.ts';

// The party answering the directions questionnaire (DQ). The defendant's and claimant's responses use the same DQ
// field types, so only the case field names differ (e.g. respondent1DQExperts and applicant1DQExperts).
export type DirectionsQuestionnaireParty = {
  // Prefix of the party's DQ case fields, e.g. respondent1DQ or applicant1DQ
  fieldPrefix: string;
  // Determination without hearing (small claims) field, e.g. deterWithoutHearingRespondent1 or deterWithoutHearing
  determinationWithoutHearingField: string;
  // Used in the text entered, e.g. Defendant1 or Claimant1
  label: string;
  // Only the defendant's response asks for a court location and remote hearing
  hasRequestedCourt: boolean;
};

export type DirectionsQuestionnaireAnswers = {
  determinationWithoutHearing: YesNo;
  oneMonthStay: YesNo;
  preActionProtocol: YesNo;
  fixedRecoverableCosts: YesNo;
  fixedRecoverableCostsBand: FixedRecoveryCostsBands;
  disclosure: YesNo;
  noOfExperts: number;
  noOfWitnesses: number;
  language: LanguageSpokenAndDocuments;
  unavailableDatesRequired: YesNo;
};

export class DirectionsQuestionnaire {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async complete(
    party: DirectionsQuestionnaireParty,
    track: trackType,
    typeOfClaim: UnspecClaimTypes,
    answers: DirectionsQuestionnaireAnswers,
  ) {
    const dq = party.fieldPrefix;
    // Experts and witnesses are named after the party they belong to, e.g. Claimant1 Witness2, so they can be told apart
    const partyName = party.label;
    const partyEmailName = party.label.toLowerCase();

    if (track === trackType.SMALL) {
      // Determination without hearing (small claims only)
      await this.page.locator(`#${party.determinationWithoutHearingField}_deterWithoutHearingYesNo_${answers.determinationWithoutHearing}`).click();
      if (answers.determinationWithoutHearing === YesNo.NO) {
        await this.page.locator(`#${party.determinationWithoutHearingField}_deterWithoutHearingWhyNot`).fill(`${party.label} reason why the claim is not suitable for determination without a hearing.`);
      }
      await this.pageHelper.continueToNextPage();
    } else {
      // File directions questionnaire (not shown for small claims)
      await this.page.locator(`#${dq}FileDirectionsQuestionnaire_explainedToClient-CONFIRM`).click();
      await this.page.locator(`#${dq}FileDirectionsQuestionnaire_oneMonthStayRequested_${answers.oneMonthStay}`).click();
      await this.page.locator(`#${dq}FileDirectionsQuestionnaire_reactionProtocolCompliedWith_${answers.preActionProtocol}`).click();

      if (answers.preActionProtocol === YesNo.NO) {
        await this.page.locator(`#${dq}FileDirectionsQuestionnaire_reactionProtocolNotCompliedWithReason`).fill('Pre-action protocol explanation');
      }
      await this.pageHelper.continueToNextPage();

      // Fixed Recoverable Costs (fast and intermediate tracks)
      if (track === trackType.FAST) {
        await this.page.locator(`#${dq}FixedRecoverableCosts_isSubjectToFixedRecoverableCostRegime_${answers.fixedRecoverableCosts}`).click();
        if (answers.fixedRecoverableCosts === YesNo.YES) {
          await this.page.locator(`#${dq}FixedRecoverableCosts_band-${answers.fixedRecoverableCostsBand}`).click();
          await this.page.locator(`#${dq}FixedRecoverableCosts_complexityBandingAgreed_${answers.fixedRecoverableCosts}`).click();
        }
        await this.page.locator(`#${dq}FixedRecoverableCosts_reasons`).fill('Fixed Recoverable Costs explanation');
        await this.pageHelper.continueToNextPage();
      } else if (track === trackType.INTERMEDIATE) {
        await this.completeIntermediateFixedRecoverableCosts(dq, answers.fixedRecoverableCosts, answers.fixedRecoverableCostsBand);
      }

      // Disclosure of electronic documents (intermediate and multi tracks only)
      const isIntermediateOrMulti = track === trackType.INTERMEDIATE || track === trackType.MULTI;
      if (isIntermediateOrMulti) {
        await this.page.locator(`#${dq}DisclosureOfElectronicDocuments_reachedAgreement_No`).click();
        await this.page.locator(`#${dq}DisclosureOfElectronicDocuments_agreementLikely_No`).click();
        await this.page.locator(`#${dq}DisclosureOfElectronicDocuments_reasonForNoAgreement`).fill('Reason no agreement on electronic disclosure is likely.');
        await this.pageHelper.continueToNextPage();
      }

      // Disclosure Non-Electronic Documents (not shown for small claims)
      await this.page.locator(`#${dq}DisclosureOfNonElectronicDocuments_directionsForDisclosureProposed_${answers.disclosure}`).click();
      if (answers.disclosure === YesNo.YES) {
        await this.page.locator(`#${dq}DisclosureOfNonElectronicDocuments_standardDirectionsRequired_No`).click();
        await this.page.locator(`#${dq}DisclosureOfNonElectronicDocuments_bespokeDirections`).fill('Bespoke directions text.');
      }
      await this.pageHelper.continueToNextPage();

      // Disclosure report (intermediate and multi tracks only, not for personal injury claims)
      if (isIntermediateOrMulti && typeOfClaim !== UnspecClaimTypes.PERSONAL_INJURY) {
        await this.page.locator(`#${dq}DisclosureReport_disclosureFormFiledAndServed_Yes`).click();
        await this.page.locator(`#${dq}DisclosureReport_disclosureProposalAgreed_Yes`).click();
        await this.page.locator(`#${dq}DisclosureReport_draftOrderNumber`).fill('123');
        await this.pageHelper.continueToNextPage();
      }
    }

    // Experts
    const expertRequired = answers.noOfExperts >= 1 ? YesNo.YES : YesNo.NO;
    await this.page.locator(`#${dq}Experts_expertRequired_${expertRequired}`).click();
    if (expertRequired === YesNo.YES) {
      await this.page.locator(`#${dq}Experts_expertReportsSent-YES`).click();
      await this.page.locator(`#${dq}Experts_jointExpertSuitable_No`).click();

      for (let i = 0; i < answers.noOfExperts; i++) {
        await this.buttonHelper.addNewButton.first().click();
        await this.page.locator(`#${dq}Experts_details_${i}_firstName`).fill(partyName);
        await this.page.locator(`#${dq}Experts_details_${i}_lastName`).fill(`Expert${i + 1}`);
        await this.page.locator(`#${dq}Experts_details_${i}_emailAddress`).fill(`${partyEmailName}.expert${i + 1}@example.com`);
        await this.page.locator(`#${dq}Experts_details_${i}_phoneNumber`).fill('07700900000');
        await this.page.locator(`#${dq}Experts_details_${i}_fieldOfExpertise`).fill(`Expert${i + 1}: Test field of expertise`);
        await this.page.locator(`#${dq}Experts_details_${i}_whyRequired`).fill(`Expert${i + 1}: Test reason why this expert is required.`);
        await this.page.locator(`#${dq}Experts_details_${i}_estimatedCost`).fill('500');
      }
    }
    await this.pageHelper.continueToNextPage();

    // Witnesses
    const witnessesRequired = answers.noOfWitnesses >= 1 ? YesNo.YES : YesNo.NO;
    await this.page.locator(`#${dq}Witnesses_witnessesToAppear_${witnessesRequired}`).click();
    if (witnessesRequired === YesNo.YES) {
      for (let i = 0; i < answers.noOfWitnesses; i++) {
        await this.buttonHelper.addNewButton.first().click();
        await this.page.locator(`#${dq}Witnesses_details_${i}_firstName`).fill(partyName);
        await this.page.locator(`#${dq}Witnesses_details_${i}_lastName`).fill(`Witness${i + 1}`);
        await this.page.locator(`#${dq}Witnesses_details_${i}_emailAddress`).fill(`${partyEmailName}.witness${i + 1}@example.com`);
        await this.page.locator(`#${dq}Witnesses_details_${i}_phoneNumber`).fill('07700900000');
        await this.page.locator(`#${dq}Witnesses_details_${i}_reasonForWitness`).fill(`Witness${i + 1}: Test event witnessed.`);
      }
    }
    await this.pageHelper.continueToNextPage();

    // Court - spoken language and document language
    await this.page.locator(`#${dq}Language_court-${answers.language}`).click();
    await this.page.locator(`#${dq}Language_documents-${answers.language}`).click();
    await this.pageHelper.continueToNextPage();

    // Hearing availability
    await this.page.locator(`#${dq}Hearing_unavailableDatesRequired_${answers.unavailableDatesRequired}`).click();
    if (answers.unavailableDatesRequired === YesNo.YES) {
      // Single date
      await this.buttonHelper.addNewButton.first().click();
      await this.page.locator(`#${dq}Hearing_unavailableDates_0_unavailableDateType-SINGLE_DATE`).click();
      await this.pageHelper.fillDate('date', moment().add(6, 'months'));

      // Date range
      await this.buttonHelper.addNewButton.first().click();
      await this.page.locator(`#${dq}Hearing_unavailableDates_1_unavailableDateType-DATE_RANGE`).click();
      await this.pageHelper.fillDate('fromDate', moment().add(7, 'months'));
      await this.pageHelper.fillDate('toDate', moment().add(7, 'months').add(5, 'days'));
    }
    const draftDirections = this.page.locator(`#${dq}DraftDirections`);
    await this.pageHelper.continueUntilVisible(draftDirections);

    // Draft directions
    await this.pageHelper.uploadFile(draftDirections, './playwright-tests/documents/TEST_DOCUMENT_4.pdf');
    await this.pageHelper.continueToNextPage();

    // Court location and remote hearing (defendant's response only)
    if (party.hasRequestedCourt) {
      await this.page.locator(`#${dq}RequestedCourt_responseCourtLocations`).selectOption(courts.clerkenwell.longAddress);
      await this.page.locator(`#${dq}RequestedCourt_reasonForHearingAtSpecificCourt`).fill('Reason for hearing at specific court.');
      await this.page.locator(`#${dq}RemoteHearing_remoteHearingRequested_Yes`).click();
      await this.page.locator(`#${dq}RemoteHearing_reasonForRemoteHearing`).fill('Reason for remote hearing.');
      await this.pageHelper.continueToNextPage();
    }

    // Hearing support
    await this.page.locator(`#${dq}HearingSupport_supportRequirements_Yes`).click();
    await this.page.locator(`#${dq}HearingSupport_supportRequirementsAdditional`).fill('Hearing support requirements.');
    await this.pageHelper.continueToNextPage();

    // Vulnerability questions
    await this.page.locator(`#${dq}VulnerabilityQuestions_vulnerabilityAdjustmentsRequired_Yes`).click();
    await this.page.locator(`#${dq}VulnerabilityQuestions_vulnerabilityAdjustments`).fill('Vulnerability adjustments required.');
    await this.pageHelper.continueToNextPage();

    // Further information
    await this.page.locator(`#${dq}FurtherInformation_futureApplications_Yes`).click();
    await this.page.locator(`#${dq}FurtherInformation_reasonForFutureApplications`).fill('Reason for future applications.');
    await this.page.locator(`#${dq}FurtherInformation_otherInformationForJudge`).fill('Other information for the judge.');
    await this.pageHelper.continueToNextPage();
  }

  // The intermediate track fields only exist when the MINTI definition is deployed. Without it the page still shows
  // (its page condition allows intermediate claims) but has nothing to fill in, so it is just continued.
  private async completeIntermediateFixedRecoverableCosts(
    dq: string,
    fixedRecoverableCosts: YesNo,
    fixedRecoverableCostsBand: FixedRecoveryCostsBands,
  ) {
    await this.page.waitForURL(/FixedRecoverableCosts/);
    const fieldPrefix = `#${dq}FixedRecoverableCostsIntermediate`;
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
    await this.pageHelper.continueToNextPage();
  }
}
