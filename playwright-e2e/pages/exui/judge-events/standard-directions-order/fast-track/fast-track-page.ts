import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import DateHelper from '../../../../../helpers/date-helper';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import {
  buttons,
  checkboxes,
  dropdowns,
  heading,
  inputs,
  paragraphs,
  radioButtons,
  subheadings,
} from './fast-track-content';

@AllMethodsStep()
export default class FastTrackPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData): Promise<void> {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(heading),
      super.expectText(paragraphs.paragraph1),
      super.expectSubheading(subheadings.judgesRecital),
      super.expectSubheading(subheadings.allocation),
      super.expectText(paragraphs.paragraph2),
      super.expectText(radioButtons.allocation.assignComplexityBand.label),
      super.expectSubheading(subheadings.altDisputeResolution),
      super.expectSubheading(subheadings.variationOfDirections),
      super.expectSubheading(subheadings.settlement),
      super.expectSubheading(subheadings.disclosureOfDocuments),
      super.expectSubheading(subheadings.witnessesOfFact),
      super.expectSubheading(subheadings.schedulesOfLoss),
      super.expectSubheading(subheadings.hearingTime),
      super.expectSubheading(subheadings.hearingMethod),
      super.expectSubheading(subheadings.newDirection),
      super.expectSubheading(subheadings.hearingNotes),
      super.expectLabel(inputs.hearingNotes.label),
      super.expectText(subheadings.welshLanguage),
      super.expectSubheading(subheadings.importantNotes),
    ]);
  }

  async addJudgesRecital() {
    await super.inputText('judges recital', inputs.judgesRecital.selector);
  }

  async addAllocation() {
    await super.clickBySelector(radioButtons.allocation.assignComplexityBand.yes.selector);
    await super.expectLabel(radioButtons.allocation.allocationComplexity.band1.label);
    await super.expectLabel(radioButtons.allocation.allocationComplexity.band2.label);
    await super.expectLabel(radioButtons.allocation.allocationComplexity.band3.label);
    await super.expectLabel(radioButtons.allocation.allocationComplexity.band4.label);
    await super.expectLabel(inputs.allocationReasons.label);

    await super.clickBySelector(radioButtons.allocation.allocationComplexity.band1.selector);
    await super.inputText('allocation reason', inputs.allocationReasons.selector);
  }

  async addAltDisputeResolution() {
    await super.expectText(paragraphs.paragraph3);
  }

  async addVariationOfDirections() {
    await super.expectText(paragraphs.paragraph4);
  }

  async addSettlement() {
    await super.expectText(paragraphs.paragraph5);
  }

  async addDisclosureOfDocuments() {
    const date1 = DateHelper.getToday();
    const date2 = DateHelper.addToToday({ days: 1, workingDay: true });
    const date3 = DateHelper.addToToday({ days: 2, workingDay: true });
    await super.inputText(
      'disclosure of documents input 1',
      inputs.disclosureOfDocuments.input1.selector,
    );
    await super.inputText(
      'disclosure of documents input 2',
      inputs.disclosureOfDocuments.input2.selector,
    );
    await super.inputText(
      'disclosure of documents input 3',
      inputs.disclosureOfDocuments.input3.selector,
    );
    await super.inputText(
      'disclosure of documents input 4',
      inputs.disclosureOfDocuments.input4.selector,
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
    await super.inputText(
      DateHelper.getTwoDigitDay(date3),
      inputs.disclosureOfDocuments.date3.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date3),
      inputs.disclosureOfDocuments.date3.month.selector,
    );
    await super.inputText(date3.getFullYear(), inputs.disclosureOfDocuments.date3.year.selector);
  }

  async addWitnessesOfFact() {
    await super.expectText(inputs.witnessesOfFact.statementsOfWitnesses.label);
    await super.expectText(radioButtons.witnessesOfFact.restrictNumWitnesses.label);
    await super.expectText(radioButtons.witnessesOfFact.restrictNumPages.label);
    await super.expectText(inputs.witnessesOfFact.deadline.label, { exact: true });

    const date = DateHelper.getToday();
    await super.inputText(
      'statement of witnesses',
      inputs.witnessesOfFact.statementsOfWitnesses.selector,
    );
    await super.inputText('deadline', inputs.witnessesOfFact.deadline.selector);
    await super.inputText('deadline text', inputs.witnessesOfFact.deadlineText.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(date),
      inputs.witnessesOfFact.deadlineDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date),
      inputs.witnessesOfFact.deadlineDate.month.selector,
    );
    await super.inputText(date.getFullYear(), inputs.witnessesOfFact.deadlineDate.year.selector);
  }

  async restrictNumWitnesess() {
    await super.clickBySelector(radioButtons.witnessesOfFact.restrictNumWitnesses.yes.selector);
    await super.expectLabel(inputs.witnessesOfFact.numClaimantWitnesses.label);
    await super.expectLabel(inputs.witnessesOfFact.numDefendantWitnesses.label);

    await super.inputText('1', inputs.witnessesOfFact.numClaimantWitnesses.selector);
    await super.inputText('2', inputs.witnessesOfFact.numDefendantWitnesses.selector);
    await super.inputText(
      'Party is witness',
      inputs.witnessesOfFact.partyIsCountedAsWitnessText.selector,
    );
  }

  async restrictNumPages() {
    await super.clickBySelector(radioButtons.witnessesOfFact.restrictNumPages.yes.selector);
    await super.expectLabel(inputs.witnessesOfFact.numPages.label);

    await super.inputText(
      'witness should not have more than',
      inputs.witnessesOfFact.witnessShouldNotMoreThanText.selector,
    );
    await super.inputText('3', inputs.witnessesOfFact.numPages.selector);
    await super.inputText('font details', inputs.witnessesOfFact.fontDetails.selector);
  }

  async addScheduleOfLoss() {
    const date1 = DateHelper.getToday();
    const date2 = DateHelper.addToToday({ days: 1, workingDay: true });
    await super.inputText('schedule of loss input 1', inputs.scheduleOfLoss.input1.selector);
    await super.inputText('schedule of loss input 2', inputs.scheduleOfLoss.input2.selector);
    await super.inputText('schedule of loss input 3', inputs.scheduleOfLoss.input3.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(date1),
      inputs.scheduleOfLoss.date1.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date1),
      inputs.scheduleOfLoss.date1.month.selector,
    );
    await super.inputText(date1.getFullYear(), inputs.scheduleOfLoss.date1.year.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(date2),
      inputs.scheduleOfLoss.date2.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date2),
      inputs.scheduleOfLoss.date2.month.selector,
    );
    await super.inputText(date2.getFullYear(), inputs.scheduleOfLoss.date2.year.selector);
  }

  async addHearingTime() {
    await super.expectText(inputs.hearingTime.dateFrom.label, { exact: true });
    await super.expectText(inputs.hearingTime.dateTo.label);
    await super.expectText(radioButtons.hearingTime.label);
    await super.expectLabel(radioButtons.hearingTime.oneHour.label);
    await super.expectLabel(radioButtons.hearingTime.oneHourThirtyMins.label);
    await super.expectLabel(radioButtons.hearingTime.twoHours.label);
    await super.expectLabel(radioButtons.hearingTime.threeHours.label);
    await super.expectLabel(radioButtons.hearingTime.fourHours.label);
    await super.expectLabel(radioButtons.hearingTime.fiveHours.label, { exact: true });
    await super.expectLabel(radioButtons.hearingTime.other.label, { exact: true });

    const date1 = DateHelper.getToday();
    const date2 = DateHelper.addToToday({ days: 1, workingDay: true });
    await super.inputText(
      DateHelper.getTwoDigitDay(date1),
      inputs.hearingTime.dateFrom.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date1),
      inputs.hearingTime.dateFrom.month.selector,
    );
    await super.inputText(date1.getFullYear(), inputs.hearingTime.dateFrom.year.selector);
    await super.inputText(DateHelper.getTwoDigitDay(date2), inputs.hearingTime.dateTo.day.selector);
    await super.inputText(
      DateHelper.getTwoDigitMonth(date2),
      inputs.hearingTime.dateTo.month.selector,
    );
    await super.inputText(date2.getFullYear(), inputs.hearingTime.dateTo.year.selector);

    await super.clickBySelector(radioButtons.hearingTime.other.selector);
    await super.expectLabel(inputs.hearingTime.otherHours.label, { exact: true });
    await super.expectLabel(inputs.hearingTime.otherMinutes.label);

    await super.inputText('4', inputs.hearingTime.otherHours.selector);
    await super.inputText('30', inputs.hearingTime.otherMinutes.selector);
    await super.inputText('hearing time help text 1', inputs.hearingTime.helpText1.selector);
    await super.inputText('hearing time help text 2', inputs.hearingTime.helpText2.selector);
  }

  async addHearingMethod() {
    await super.expectText(radioButtons.hearingMethod.label);
    await super.expectLabel(dropdowns.hearingMethod.label);
    await super.expectLabel(radioButtons.hearingMethod.inPerson.label);
    await super.expectLabel(radioButtons.hearingMethod.telephone.label);
    await super.expectLabel(radioButtons.hearingMethod.video.label);
    await super.clickByText(radioButtons.hearingMethod.telephone.label);
  }

  async addBuildingDispute() {
    await super.expectSubheading(subheadings.buildingDispute);

    const date1 = DateHelper.getToday();
    const date2 = DateHelper.addToToday({ days: 1, workingDay: true });
    await super.inputText('building dispute input 1', inputs.buildingDispute.input1.selector);
    await super.inputText('building dispute input 2', inputs.buildingDispute.input2.selector);
    await super.inputText('building dispute input 3', inputs.buildingDispute.input3.selector);
    await super.inputText('building dispute input 4', inputs.buildingDispute.input4.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(date1),
      inputs.buildingDispute.date1.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date1),
      inputs.buildingDispute.date1.month.selector,
    );
    await super.inputText(date1.getFullYear(), inputs.buildingDispute.date1.year.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(date2),
      inputs.buildingDispute.date2.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date2),
      inputs.buildingDispute.date2.month.selector,
    );
    await super.inputText(date2.getFullYear(), inputs.buildingDispute.date2.year.selector);
  }

  async addClinicalNegligence() {
    await super.expectSubheading(subheadings.clinicalNegligence);
    await super.expectText(inputs.clinicalNegliegence.input1.hintText);

    await super.inputText(
      'clinical negligence input 1',
      inputs.clinicalNegliegence.input1.selector,
    );
    await super.inputText(
      'clinical negligence input 2',
      inputs.clinicalNegliegence.input2.selector,
    );
    await super.inputText(
      'clinical negligence input 3',
      inputs.clinicalNegliegence.input3.selector,
    );
    await super.inputText(
      'clinical negligence input 4',
      inputs.clinicalNegliegence.input4.selector,
    );
  }

  async addCreditHire() {
    await super.expectText(paragraphs.paragraph6);
    await super.expectText(paragraphs.paragraph10);

    const date1 = DateHelper.getToday();
    const date2 = DateHelper.addToToday({ days: 1, workingDay: true });
    const date3 = DateHelper.addToToday({ days: 2, workingDay: true });
    const date4 = DateHelper.addToToday({ days: 1, workingDay: true });
    await super.inputText('credit hire input 1', inputs.creditHire.input1.selector);
    await super.inputText('credit hire input 2', inputs.creditHire.input2.selector);
    await super.inputText('credit hire input 3', inputs.creditHire.input3.selector);
    await super.inputText('credit hire input 4', inputs.creditHire.input4.selector);
    await super.inputText('credit hire input 5', inputs.creditHire.input5.selector);
    await super.inputText('credit hire input 6', inputs.creditHire.input6.selector);
    await super.inputText('credit hire input 7', inputs.creditHire.input7.selector);
    await super.inputText('credit hire input 8', inputs.creditHire.input8.selector);
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

  async addEmployersLiability() {
    await super.expectSubheading(subheadings.employersLiability);
    await super.expectText(paragraphs.paragraph7);
  }

  async addHousingDisrepair() {
    await super.expectSubheading(subheadings.housingDisrepair);

    const date1 = DateHelper.getToday();
    const date2 = DateHelper.addToToday({ days: 1, workingDay: true });
    await super.inputText('housing disrepair input 1', inputs.housingDisrepair.input1.selector);
    await super.inputText('housing disrepair input 2', inputs.housingDisrepair.input2.selector);
    await super.inputText('housing disrepair input 3', inputs.housingDisrepair.input3.selector);
    await super.inputText('housing disrepair input 4', inputs.housingDisrepair.input4.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(date1),
      inputs.housingDisrepair.date1.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date1),
      inputs.housingDisrepair.date1.month.selector,
    );
    await super.inputText(date1.getFullYear(), inputs.housingDisrepair.date1.year.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(date2),
      inputs.housingDisrepair.date2.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date2),
      inputs.housingDisrepair.date2.month.selector,
    );
    await super.inputText(date2.getFullYear(), inputs.housingDisrepair.date2.year.selector);
  }

  async addExpertEvidence() {
    await super.expectSubheading(subheadings.expertEvidence);

    const date2 = DateHelper.getToday();
    const date3 = DateHelper.addToToday({ days: 1, workingDay: true });
    const date4 = DateHelper.addToToday({ days: 2, workingDay: true });

    await super.inputText('expert evidence input 1', inputs.expertEvidence.input1.selector);
    await super.inputText('expert evidence input 2', inputs.expertEvidence.input2.selector);
    await super.inputText('expert evidence input 3', inputs.expertEvidence.input3.selector);
    await super.inputText('expert evidence input 4', inputs.expertEvidence.input4.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(date2),
      inputs.expertEvidence.date2.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date2),
      inputs.expertEvidence.date2.month.selector,
    );
    await super.inputText(date2.getFullYear(), inputs.expertEvidence.date2.year.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(date3),
      inputs.expertEvidence.date3.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date3),
      inputs.expertEvidence.date3.month.selector,
    );
    await super.inputText(date3.getFullYear(), inputs.expertEvidence.date3.year.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(date4),
      inputs.expertEvidence.date4.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date4),
      inputs.expertEvidence.date4.month.selector,
    );
    await super.inputText(date4.getFullYear(), inputs.expertEvidence.date4.year.selector);
  }

  async addRoadTrafficeAccident() {
    await super.expectSubheading(subheadings.roadTrafficAccident);

    const date = DateHelper.getToday();
    await super.inputText('road traffic accident', inputs.roadTrafficAccident.input.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(date),
      inputs.roadTrafficAccident.date.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date),
      inputs.roadTrafficAccident.date.month.selector,
    );
    await super.inputText(date.getFullYear(), inputs.roadTrafficAccident.date.year.selector);
  }

  async addNewDirection() {
    await super.clickBySelector(buttons.addNewDirection.selector);
    await super.expectLabel(inputs.newDirection.label);
    await super.inputText('new direction', inputs.newDirection.selector);
  }

  async addHearingNotes() {
    await super.inputText('hearing notes', inputs.hearingNotes.selector);
  }

  async addWelshLanguage() {
    await super.clickBySelector(checkboxes.includeWelshLanguage.selector);
    await super.expectText(paragraphs.paragraph8);
  }

  async addImportantNotes() {
    await super.inputText('important notes', inputs.importantNotes.selector);
  }

  async submit(...args: any[]): Promise<void> {
    await super.retryClickSubmit();
  }
}
