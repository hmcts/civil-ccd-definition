import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import DateHelper from '../../../../../helpers/date-helper';
import ExuiEvent from '../../../exui-event/exui-event';
import {
  buttons,
  checkboxes,
  inputs,
  paragraphs,
  radioButtons,
  subheadings,
} from './small-claims-dispute-resolution-hearing-content';

@AllMethodsStep()
export default class SmallClaimsDisputeResolutionPage extends ExuiEvent(BasePage) {
  async verifyContent(...args: any[]): Promise<void> {
    await super.runVerifications([
      super.expectText(paragraphs.paragraph1),
      super.expectText(subheadings.warning),
      super.expectText(paragraphs.paragraph2),
      super.expectText(paragraphs.paragraph3),
      super.expectText(subheadings.judgesRecital),
      super.expectText(subheadings.allocation),
      super.expectText(paragraphs.paragraph4),
      super.expectText(subheadings.disputeResolutionHearing),
      super.expectText(paragraphs.paragraph5),
      super.expectText(subheadings.legalReprentationForDRH),
      super.expectText(paragraphs.paragraph6),
      super.expectText(subheadings.judgePowersAtDRH),
      super.expectText(paragraphs.paragraph7),
      super.expectText(subheadings.paymentProtectionInsurance),
      super.expectText(subheadings.witnessStatements),
      super.expectText(subheadings.uploadOfDocuments),
      super.expectText(subheadings.addNewDirection),
      super.expectText(subheadings.hearing),
      super.expectText(subheadings.welshLanguage),
      super.expectText(subheadings.importantNotes),
    ]);
  }

  async addPaymentProtectionInsurance() {
    await super.clickBySelector(checkboxes.includePaymentProtectionInsurance.selector);
    await super.expectText(paragraphs.paragraph14);
    await super.expectLabel(inputs.ppiDate.label);
    await super.expectText(paragraphs.paragraph15);

    const ppiDate = DateHelper.getToday();
    await super.inputText(DateHelper.getTwoDigitDay(ppiDate), inputs.ppiDate.day.selector);
    await super.inputText(DateHelper.getTwoDigitMonth(ppiDate), inputs.ppiDate.month.selector);
    await super.inputText(ppiDate.getFullYear(), inputs.ppiDate.year.selector);
  }

  async addWitnessStatements() {
    await super.expectText(paragraphs.paragraph8);
    await super.expectLabel(inputs.witnessStatements.statementOfWtinesses.label);
    await super.expectText(radioButtons.witnessStatements.restrictNumWitnesses.label);
    await super.expectText(radioButtons.witnessStatements.restrictNumPages.label);
    await super.expectText(paragraphs.paragraph9);
    await super.expectText(paragraphs.paragraph10);
    await super.expectText(paragraphs.paragraph11);
    await super.expectText(paragraphs.paragraph12);

    await super.inputText(
      'witness statement',
      inputs.witnessStatements.statementOfWtinesses.selector,
    );
  }

  async restrictNumWitnesses() {
    await super.clickBySelector(radioButtons.witnessStatements.restrictNumWitnesses.yes.selector);
    await super.expectLabel(inputs.witnessStatements.numClaimantWitnesses.label);
    await super.expectLabel(inputs.witnessStatements.numDefendantWitnesses.label);

    await super.inputText('1', inputs.witnessStatements.numClaimantWitnesses.selector);
    await super.inputText('2', inputs.witnessStatements.numDefendantWitnesses.selector);
    await super.inputText(
      'Party is not included',
      inputs.witnessStatements.partyIsCountedAsWitnessText.selector,
    );
  }

  async restrictNumPages() {
    await super.clickBySelector(radioButtons.witnessStatements.restrictNumPages.yes.selector);
    await super.expectLabel(inputs.witnessStatements.numPages.label);
    await super.inputText(
      'witness statement must be no more than',
      inputs.witnessStatements.witnessShouldNotMoreThanText.selector,
    );
    await super.inputText('3', inputs.witnessStatements.numPages.selector);
    await super.inputText('font details', inputs.witnessStatements.fontDetails.selector);
  }

  async addUploadOfDocuments() {
    await super.expectText(inputs.uploadOfDocuments.label);
    await super.inputText(
      'Make sure to upload the files as pdfs',
      inputs.uploadOfDocuments.selector,
    );
  }

  async addNewDirection() {
    await super.clickBySelector(buttons.addNewDirection.selector);
    await super.expectLabel(inputs.newDirection.label);
    await super.inputText('New direction', inputs.newDirection.selector);
  }

  async addHearing() {
    await super.expectLabel(radioButtons.hearing.trialOnOptions.label);
    await super.expectLabel(radioButtons.hearing.trialOnOptions.firstOpenDate.label);
    await super.expectText(radioButtons.hearing.trialOnOptions.hearingWindow.label);
    await super.expectText(inputs.hearing.listFrom.label);
    await super.expectLabel(radioButtons.hearing.lengthOfHearing.label);
    await super.expectLabel(radioButtons.hearing.lengthOfHearing.fifteenMins.label);
    await super.expectLabel(radioButtons.hearing.lengthOfHearing.thirtyMins.label);
    await super.expectLabel(radioButtons.hearing.lengthOfHearing.oneHour.label);
    await super.expectLabel(radioButtons.hearing.lengthOfHearing.other.label);
    await super.expectText(paragraphs.paragraph13);
    await super.expectText(radioButtons.hearing.hearingLocation.label);
    await super.expectLabel(radioButtons.hearing.hearingLocation.otherLocation.label);
    await super.expectText(radioButtons.hearing.methodOfHearing.label);
    await super.expectText(radioButtons.hearing.methodOfHearing.hintText);
    await super.expectLabel(radioButtons.hearing.methodOfHearing.inPerson.label);
    await super.expectLabel(radioButtons.hearing.methodOfHearing.telephone.label);
    await super.expectLabel(radioButtons.hearing.methodOfHearing.video.label);
    await super.expectLabel(radioButtons.hearing.physicalHearingBundle.label);
    await super.expectLabel(radioButtons.hearing.physicalHearingBundle.party.label);
    await super.expectText(inputs.hearing.bundleOfDocuments.label);
    await super.expectText(inputs.hearing.hearingNotes.label1);
    await super.expectText(inputs.hearing.hearingNotes.label2);

    const listFrom = DateHelper.addToToday({ days: 1, workingDay: true });
    const dateTo = DateHelper.addToToday({ days: 2, workingDay: true });
    await super.clickBySelector(radioButtons.hearing.trialOnOptions.hearingWindow.selector);
    await super.expectText(inputs.hearing.dateTo.label);
    await super.inputText(
      DateHelper.getTwoDigitDay(listFrom),
      inputs.hearing.listFrom.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(listFrom),
      inputs.hearing.listFrom.month.selector,
    );
    await super.inputText(listFrom.getFullYear(), inputs.hearing.listFrom.year.selector);
    await super.inputText(DateHelper.getTwoDigitDay(dateTo), inputs.hearing.dateTo.day.selector);
    await super.inputText(
      DateHelper.getTwoDigitMonth(dateTo),
      inputs.hearing.dateTo.month.selector,
    );
    await super.inputText(dateTo.getFullYear(), inputs.hearing.dateTo.year.selector);

    await super.clickBySelector(radioButtons.hearing.lengthOfHearing.other.selector);
    await super.expectLabel(inputs.hearing.lengthOfHearing.days.label);
    await super.expectLabel(inputs.hearing.lengthOfHearing.hours.label);
    await super.expectLabel(inputs.hearing.lengthOfHearing.minutes.label);
    await super.inputText('3', inputs.hearing.lengthOfHearing.days.selector);
    await super.inputText('5', inputs.hearing.lengthOfHearing.hours.selector);
    await super.inputText('0', inputs.hearing.lengthOfHearing.minutes.selector);

    await super.clickBySelector(radioButtons.hearing.methodOfHearing.telephone.selector);

    await super.inputText('bundle documents', inputs.hearing.bundleOfDocuments.selector);

    await super.inputText('hearing notes', inputs.hearing.hearingNotes.selector);
  }

  async addUseOfWelshLanguage() {
    await super.clickBySelector(checkboxes.includeWelshLanguage.selector);
    await super.expectText(paragraphs.paragraph16);
  }

  async addImportantNotes() {
    const date = DateHelper.addToToday({ days: 3, workingDay: true });
    await super.inputText('important notes', inputs.importantNotes.notes.selector);
    await super.inputText(DateHelper.getTwoDigitDay(date), inputs.importantNotes.date.day.selector);
    await super.inputText(
      DateHelper.getTwoDigitMonth(date),
      inputs.importantNotes.date.month.selector,
    );
    await super.inputText(date.getFullYear(), inputs.importantNotes.date.year.selector);
  }

  async submit(...args: any[]): Promise<void> {
    await super.retryClickSubmit();
  }
}
