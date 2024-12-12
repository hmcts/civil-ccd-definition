import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import DateHelper from '../../../../../helpers/date-helper';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import {
  buttons,
  checkboxes,
  creditHireContent,
  dropdowns,
  heading,
  inputs,
  paragraphs,
  radioButtons,
  subheadings,
} from './small-claims-content';

@AllMethodsStep()
export default class SmallClaimsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData): Promise<void> {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectHeading(heading),
        super.expectText(paragraphs.paragraph2),
        super.expectText(paragraphs.paragraph3),
        super.expectSubheading(subheadings.judgesRecital),
        super.expectSubheading(subheadings.allocation),
        super.expectText(paragraphs.paragraph1),
        super.expectSubheading(subheadings.hearingTime),
        super.expectSubheading(subheadings.hearingMethod),
        super.expectText(radioButtons.hearingMethod.label),
        super.expectLabel(radioButtons.hearingMethod.inPerson.label),
        super.expectLabel(radioButtons.hearingMethod.telephone.label),
        super.expectLabel(radioButtons.hearingMethod.video.label),
        super.expectLabel(dropdowns.hearingLocation.label),
        super.expectSubheading(subheadings.hearingNotes),
        super.expectText(inputs.hearingNotes.hintText),
        super.expectText(subheadings.welshLanguage),
        super.expectSubheading(subheadings.importantNotes),
        super.expectSubheading(subheadings.documents),
        super.expectSubheading(subheadings.witnessStatement),
        super.expectSubheading(subheadings.addNewDirection),
      ],
      { runAxe: false },
    );
  }

  async verifyJudgementSum() {
    await super.expectSubheading(subheadings.judgementClaimSum);
    await super.expectText(paragraphs.paragraph7);
  }

  async addJudgesRecital() {
    await super.inputText('judges recital', inputs.judgesRecital.selector);
  }

  async addHearingTime() {
    await super.expectText(inputs.hearingTime.dateFrom.label);
    await super.expectText(inputs.hearingTime.dateTo.label);
    await super.expectText(radioButtons.hearingTime.label);
    await super.expectLabel(radioButtons.hearingTime.thirtyMins.label);
    await super.expectLabel(radioButtons.hearingTime.oneHour.label);
    await super.expectLabel(radioButtons.hearingTime.oneHourThirtyMins.label);
    await super.expectLabel(radioButtons.hearingTime.twoHours.label);
    await super.expectLabel(radioButtons.hearingTime.twohoursThirtyMins.label);
    await super.expectLabel(radioButtons.hearingTime.other.label);

    const dateFrom = DateHelper.getToday();
    const dateTo = DateHelper.addToToday({ days: 1, workingDay: true });
    await super.inputText(
      DateHelper.getTwoDigitDay(dateFrom),
      inputs.hearingTime.dateFrom.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(dateFrom),
      inputs.hearingTime.dateFrom.month.selector,
    );
    await super.inputText(dateFrom.getFullYear(), inputs.hearingTime.dateFrom.year.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(dateTo),
      inputs.hearingTime.dateTo.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(dateTo),
      inputs.hearingTime.dateTo.month.selector,
    );
    await super.inputText(dateTo.getFullYear(), inputs.hearingTime.dateTo.year.selector);

    // TODO - work out why this does not work
    await super.clickBySelector(radioButtons.hearingTime.other.selector);

    await super.expectText(inputs.hearingTime.otherHours.label);
    await super.expectText(inputs.hearingTime.otherMinutes.label);
    await super.inputText('3', inputs.hearingTime.otherHours.selector);
    await super.inputText('0', inputs.hearingTime.otherMinutes.selector);
    await super.inputText('info about hearing time', inputs.hearingTime.input.selector);
  }

  async removeHearingTime() {
    await super.clickBySelector(checkboxes.hearingTime.selector);
  }

  async addHearingMethod() {
    await super.clickByText(radioButtons.hearingMethod.telephone.label);
  }

  async addHearingNotes() {
    await super.inputText('hearing notes', inputs.hearingNotes.selector);
  }

  async addWelshLanguage() {
    await super.clickBySelector(checkboxes.welshLanguage.selector);
    await super.expectText(paragraphs.paragraph6);
  }

  async addImportantNotes() {
    await super.inputText('Important notes', inputs.importantNotes.selector);
  }

  async addDocuments() {
    await super.inputText('docs input 1', inputs.documents.input1.selector);
    await super.inputText('docs input 2', inputs.documents.input2.selector);
  }

  async addWitnessStatement() {
    await super.expectLabel(inputs.witnessStatement.statementOfWitnesses.label);
    await super.expectText(radioButtons.witnessStatement.restrictNumWitnesses.label);
    await super.expectText(radioButtons.witnessStatement.restrictNumPages.label);
    await super.expectText(paragraphs.paragraph4);
    await super.expectText(paragraphs.paragraph5);

    await super.inputText(
      'witness statement',
      inputs.witnessStatement.statementOfWitnesses.selector,
    );
  }

  async restrictNumWitnesses() {
    await super.clickBySelector(radioButtons.witnessStatement.restrictNumWitnesses.yes.selector);
    await super.expectLabel(inputs.witnessStatement.numClaimantWitnesses.label);
    await super.expectText(inputs.witnessStatement.numDefendantWitnesses.label);
    await super.inputText('1', inputs.witnessStatement.numClaimantWitnesses.selector);
    await super.inputText('2', inputs.witnessStatement.numDefendantWitnesses.selector);
    await super.inputText(
      'Party can count as witness',
      inputs.witnessStatement.partyIsCountedAsWitnessText.selector,
    );
  }

  async restrictNumPages() {
    await super.clickBySelector(radioButtons.witnessStatement.restrictNumPages.yes.selector);
    await super.expectLabel(inputs.witnessStatement.numPages.label);
    await super.inputText(
      'Each statement should be no more than',
      inputs.witnessStatement.witnessShouldNotMoreThanText.selector,
    );
    await super.inputText('4', inputs.witnessStatement.numPages.selector);
    await super.inputText('font details', inputs.witnessStatement.fontDetails.selector);
  }

  async addNewDirection() {
    await super.clickBySelector(buttons.addNewDirection.selector);
    await super.expectLabel(inputs.newDirection.label);
    await super.inputText('new direction', inputs.newDirection.selector);
  }

  async addFlightDelay() {
    await super.expectSubheading(subheadings.flightDelay);
    await super.expectSubheading(subheadings.relatedClaims);
    await super.expectSubheading(subheadings.legalArguments);

    await super.inputText('Flight delay related claims', inputs.flightDelay.relatedClaim.selector);
    await super.inputText(
      'Flight delay legal arguments',
      inputs.flightDelay.legalArduments.selector,
    );
  }

  async addCreditHire() {
    await super.expectText(creditHireContent.paragraph1);
    await super.expectText(creditHireContent.paragraph2);

    await super.inputText('Credit hire input 1', inputs.creditHire.input1.selector);
    await super.inputText('Credit hire input 2', inputs.creditHire.input2.selector);
    await super.inputText('Credit hire input 3', inputs.creditHire.input3.selector);
    await super.inputText('Credit hire input 4', inputs.creditHire.input4.selector);
    await super.inputText('Credit hire input 5', inputs.creditHire.input5.selector);
    await super.inputText('Credit hire input 6', inputs.creditHire.input6.selector);
    await super.inputText('Credit hire input 7', inputs.creditHire.input7.selector);
    await super.inputText('Credit hire input 8', inputs.creditHire.input8.selector);

    const date1 = DateHelper.getToday();
    const date2 = DateHelper.addToToday({ days: 1, workingDay: true });
    const date3 = DateHelper.addToToday({ days: 2, workingDay: true });
    const date4 = DateHelper.addToToday({ days: 3, workingDay: true });

    await super.inputText(DateHelper.getTwoDigitDay(date1), inputs.creditHire.date1.day.selector);
    await super.inputText(
      DateHelper.getTwoDigitMonth(date1),
      inputs.creditHire.date1.month.selector,
    );
    await super.inputText(date1.getFullYear(), inputs.creditHire.date1.year.selector);

    await super.inputText(DateHelper.getTwoDigitDay(date2), inputs.creditHire.date2.day.selector);
    await super.inputText(
      DateHelper.getTwoDigitMonth(date2),
      inputs.creditHire.date2.month.selector,
    );
    await super.inputText(date2.getFullYear(), inputs.creditHire.date2.year.selector);

    await super.inputText(DateHelper.getTwoDigitDay(date3), inputs.creditHire.date3.day.selector);
    await super.inputText(
      DateHelper.getTwoDigitMonth(date3),
      inputs.creditHire.date3.month.selector,
    );
    await super.inputText(date3.getFullYear(), inputs.creditHire.date3.year.selector);

    await super.inputText(DateHelper.getTwoDigitDay(date4), inputs.creditHire.date4.day.selector);
    await super.inputText(
      DateHelper.getTwoDigitMonth(date4),
      inputs.creditHire.date4.month.selector,
    );
    await super.inputText(date4.getFullYear(), inputs.creditHire.date4.year.selector);
  }

  async addRoadTrafficAccident() {
    await super.expectSubheading(subheadings.roadTrafficAccident);
    await super.inputText('Road Traffic accident', inputs.roadTrafficAccident.selector);
  }

  async submit(...args: any[]): Promise<void> {
    await super.retryClickSubmit();
  }
}
