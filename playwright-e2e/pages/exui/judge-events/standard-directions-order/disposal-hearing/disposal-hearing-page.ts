import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import DateHelper from '../../../../../helpers/date-helper';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import {
  buttons,
  checkboxes,
  dropdowns,
  inputs,
  paragraphs,
  radioButtons,
  subheadings,
} from './disposal-hearing-content';

@AllMethodsStep()
export default class DisposalHearingPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData): Promise<void> {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subheadings.orderHearingDetails),
      super.expectText(paragraphs.paragraph1),
      super.expectSubheading(subheadings.judgesRecital),
      super.expectSubheading(subheadings.judgementForClaimant),
      super.expectText(paragraphs.paragraph2),
      super.expectSubheading(subheadings.disclosureOfDocuments),
      super.expectSubheading(subheadings.witnessOfFact),
      super.expectSubheading(subheadings.medicalEvidence),
      super.expectSubheading(subheadings.questionsToExperts),
      super.expectSubheading(subheadings.scheduleOfLoss),
      super.expectSubheading(subheadings.hearingTime),
      super.expectSubheading(subheadings.hearingTime),
      super.expectSubheading(subheadings.hearingMethod),
      super.expectSubheading(subheadings.disposalHearingBundle),
      super.expectSubheading(subheadings.claimSettling),
      super.expectSubheading(subheadings.costs),
      super.expectSubheading(subheadings.newDirection),
      super.expectSubheading(subheadings.hearingNotes),
      super.expectText(subheadings.welshLanguage),
      super.expectSubheading(subheadings.importantNotes),
    ]);
  }

  async addJudgesRecital() {
    await super.inputText('judges recital', inputs.judgesRecital.selector);
  }

  async addDisclosureOfDocuments() {
    const date1 = DateHelper.getToday();
    const date2 = DateHelper.addToToday({ days: 1, workingDay: true });
    await super.inputText(
      'disclosure of documents input 1',
      inputs.disclosureOfDocuments.input1.selector,
    );
    await super.inputText(
      'disclosure of documents input 2',
      inputs.disclosureOfDocuments.input1.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitDay(date1),
      inputs.disclosureOfDocuments.date1.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date1),
      inputs.disclosureOfDocuments.date1.month.selector,
    );
    await super.inputText(date1.getFullYear(), inputs.disclosureOfDocuments.date1.year.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(date2),
      inputs.disclosureOfDocuments.date2.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date2),
      inputs.disclosureOfDocuments.date2.month.selector,
    );
    await super.inputText(date2.getFullYear(), inputs.disclosureOfDocuments.date2.year.selector);
  }

  async addWitnessesOfFact() {
    const date2 = DateHelper.getToday();
    const date3 = DateHelper.addToToday({ days: 1, workingDay: true });
    await super.inputText('witnesses of fact input 3', inputs.witnessOfFact.input3.selector);
    await super.inputText('witnesses of fact input 4', inputs.witnessOfFact.input4.selector);
    await super.inputText('witnesses of fact input 5', inputs.witnessOfFact.input5.selector);
    await super.inputText('witnesses of fact input 3', inputs.witnessOfFact.input6.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(date2),
      inputs.witnessOfFact.date2.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date2),
      inputs.witnessOfFact.date2.month.selector,
    );
    await super.inputText(date2.getFullYear(), inputs.witnessOfFact.date2.year.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(date3),
      inputs.witnessOfFact.date3.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date3),
      inputs.witnessOfFact.date3.month.selector,
    );
    await super.inputText(date3.getFullYear(), inputs.witnessOfFact.date3.year.selector);
  }

  async addMedicalEvidence() {
    const date = DateHelper.getToday();
    await super.inputText('medical evidence input 1', inputs.medicalEvidence.input.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(date),
      inputs.medicalEvidence.date.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date),
      inputs.medicalEvidence.date.month.selector,
    );
    await super.inputText(date.getFullYear(), inputs.medicalEvidence.date.year.selector);
  }

  async addQuestionsToExperts() {
    await super.expectText(paragraphs.paragraph3);
    await super.expectText(paragraphs.paragraph4);

    const date = DateHelper.getToday();
    await super.inputText(
      DateHelper.getTwoDigitDay(date),
      inputs.questionsToExperts.date.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date),
      inputs.questionsToExperts.date.month.selector,
    );
    await super.inputText(date.getFullYear(), inputs.questionsToExperts.date.year.selector);
  }

  async addScheduleOfLoss() {
    await super.expectText(paragraphs.paragraph5);

    const date2 = DateHelper.getToday();
    const date3 = DateHelper.addToToday({ days: 1, workingDay: true });
    const date4 = DateHelper.addToToday({ days: 3, workingDay: true });
    await super.inputText('schedule of loss input 2', inputs.scheduleOfLoss.input2.selector);
    await super.inputText('schedule of loss input 3', inputs.scheduleOfLoss.input3.selector);
    await super.inputText('schedule of loss input 4', inputs.scheduleOfLoss.input4.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(date2),
      inputs.scheduleOfLoss.date2.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date2),
      inputs.scheduleOfLoss.date2.month.selector,
    );
    await super.inputText(date2.getFullYear(), inputs.scheduleOfLoss.date2.year.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(date3),
      inputs.scheduleOfLoss.date3.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date3),
      inputs.scheduleOfLoss.date3.month.selector,
    );
    await super.inputText(date3.getFullYear(), inputs.scheduleOfLoss.date3.year.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(date4),
      inputs.scheduleOfLoss.date4.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date4),
      inputs.scheduleOfLoss.date4.month.selector,
    );
    await super.inputText(date4.getFullYear(), inputs.scheduleOfLoss.date4.year.selector);
  }

  async addHearingTime() {
    await super.expectText(inputs.hearingTime.dateFrom.label);
    await super.expectText(inputs.hearingTime.dateTo.label);
    await super.expectLabel(radioButtons.hearingTime.label);
    await super.expectLabel(radioButtons.hearingTime.thirtyMins.label);
    await super.expectLabel(radioButtons.hearingTime.fifteenMins.label);
    await super.expectLabel(radioButtons.hearingTime.other.label);

    await super.clickBySelector(radioButtons.hearingTime.other.selector);
    await super.expectLabel(inputs.hearingTime.otherHours.label);
    await super.expectLabel(inputs.hearingTime.otherMinutes.label);

    const dateFrom = DateHelper.getToday();
    const dateTo = DateHelper.addToToday({ days: 1, workingDay: true });
    await super.inputText('hearing time input', inputs.hearingTime.input.selector);
    await super.inputText('1', inputs.hearingTime.otherHours.selector);
    await super.inputText('30', inputs.hearingTime.otherMinutes.selector);
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
  }

  async addHearingMethod() {
    await super.expectLabel(radioButtons.hearingMethod.label);
    await super.expectLabel(radioButtons.hearingMethod.inPerson.label);
    await super.expectLabel(radioButtons.hearingMethod.telephone.label);
    await super.expectLabel(radioButtons.hearingMethod.video.label);
    await super.expectLabel(dropdowns.hearingMethod.label);

    await super.clickBySelector(radioButtons.hearingMethod.telephone.selector);
  }

  async addDisposalHearingBundle() {
    await super.expectText(checkboxes.disposalHearingBundle.bundleType.label);
    await super.expectLabel(checkboxes.disposalHearingBundle.bundleType.documents.label);
    await super.expectLabel(checkboxes.disposalHearingBundle.bundleType.electronic.label);
    await super.expectLabel(checkboxes.disposalHearingBundle.bundleType.summary.label);

    await super.inputText('disposal hearing bundle input', inputs.disposalHearingBundle.selector);
    await super.clickBySelector(checkboxes.disposalHearingBundle.bundleType.documents.selector);
    await super.clickBySelector(checkboxes.disposalHearingBundle.bundleType.electronic.selector);
    await super.clickBySelector(checkboxes.disposalHearingBundle.bundleType.summary.selector);
  }

  async addClaimSetting() {
    await super.expectText(paragraphs.paragraph6);
  }

  async addCosts() {
    await super.expectText(paragraphs.paragraph7);
  }

  async addNewDirection() {
    await super.clickBySelector(buttons.addNewDirection.selector);
    await super.expectLabel(inputs.newDirection.label);
    await super.inputText('new direction', inputs.newDirection.selector);
  }

  async addHearingNotes() {
    await super.expectLabel(inputs.hearingNotes.label);
    await super.inputText('hearing notes', inputs.hearingNotes.selector);
  }

  async addWelshLanguage() {
    await super.clickBySelector(checkboxes.welshLanguage.selector);
    await super.expectText(paragraphs.paragraph8);
  }

  async addImportantNotes() {
    await super.inputText('important notes', inputs.importantNotes.selector);
  }

  async submit(...args: any[]): Promise<void> {
    await super.retryClickSubmit();
  }
}
