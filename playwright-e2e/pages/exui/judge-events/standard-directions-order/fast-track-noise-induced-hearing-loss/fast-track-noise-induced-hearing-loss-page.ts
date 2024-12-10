import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import DateHelper from '../../../../../helpers/date-helper';
import ExuiPage from '../../../exui-page/exui-page';
import {
  buttons,
  checkboxes,
  inputs,
  paragraphs,
  radioButtons,
  subheadings,
} from './fast-track-noise-induced-hearing-loss-content';

@AllMethodsStep()
export default class FastTrackInducedHearingLossPage extends ExuiPage(BasePage) {
  async verifyContent(...args: any[]): Promise<void> {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(paragraphs.paragraph1),
      super.expectText(subheadings.warning),
      super.expectText(paragraphs.paragraph2),
      super.expectText(subheadings.judgesRecital),
      super.expectText(subheadings.allocation),
      super.expectText(paragraphs.paragraph3),
      super.expectText(subheadings.altDisputeResolution),
      super.expectText(subheadings.variationOfDirections),
      super.expectText(subheadings.settlement),
      super.expectText(subheadings.disclosureOfDocuments),
      super.expectText(subheadings.witnessOfFact),
      super.expectText(subheadings.addendumReport),
      super.expectText(subheadings.furtherAudiogram),
      super.expectText(subheadings.questionsClaimantExpert),
      super.expectText(subheadings.permissionDefendantRelyExpertEvidence),
      super.expectText(subheadings.evidenceExpertAcousticEngineer),
      super.expectText(subheadings.questionsToEntExpert),
      super.expectText(subheadings.scheduleOfLoss),
      super.expectText(subheadings.uploadOfDocuments),
      super.expectText(subheadings.newDirection),
      super.expectText(subheadings.trial),
      super.expectText(subheadings.welshLanguage),
      super.expectText(subheadings.importantNotes),
    ]);
  }

  async addAlternativeDisputeResolution() {
    await super.expectText(paragraphs.paragraph4);
  }

  async addVariationOfDirections() {
    await super.expectText(paragraphs.paragraph5);
  }

  async addSettlement() {
    await super.expectText(paragraphs.paragraph6);
  }

  async addDisclosureOfDocuments() {
    await super.expectText(inputs.disclosureOfDocuments.standardDisclosure.label);
    await super.expectText(inputs.disclosureOfDocuments.inspection.label);
    await super.expectLabel(inputs.disclosureOfDocuments.requestWillBeCompiled.label);

    const standardDisclosureDate = DateHelper.getToday();
    const inspectionDate = DateHelper.addToToday({ days: 1, workingDay: true });
    await super.inputText(
      'standard disclosure',
      inputs.disclosureOfDocuments.standardDisclosure.selector,
    );
    await super.inputText('inspection', inputs.disclosureOfDocuments.inspection.selector);
    await super.inputText('in x days', inputs.disclosureOfDocuments.requestWillBeCompiled.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(standardDisclosureDate),
      inputs.disclosureOfDocuments.standardDisclosureDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(standardDisclosureDate),
      inputs.disclosureOfDocuments.standardDisclosureDate.month.selector,
    );
    await super.inputText(
      standardDisclosureDate.getFullYear(),
      inputs.disclosureOfDocuments.standardDisclosureDate.year.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitDay(inspectionDate),
      inputs.disclosureOfDocuments.inspectionDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(inspectionDate),
      inputs.disclosureOfDocuments.inspectionDate.month.selector,
    );
    await super.inputText(
      inspectionDate.getFullYear(),
      inputs.disclosureOfDocuments.inspectionDate.year.selector,
    );
  }

  async addWitnessesOfFact() {
    await super.expectText(inputs.witnessesOfFact.statementOfWitnesses.label);
    await super.expectText(radioButtons.witnessesOfFact.restrictNumWitnesses.label);
    await super.expectText(radioButtons.witnessesOfFact.restrictNumPages.label);
    await super.expectText(inputs.witnessesOfFact.deadline.label);

    const date = DateHelper.getToday();
    await super.inputText(
      'statement of witneses',
      inputs.witnessesOfFact.statementOfWitnesses.selector,
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

  async restrictNumWitnesses() {
    await super.clickBySelector(radioButtons.witnessesOfFact.restrictNumWitnesses.yes.selector);
    await super.expectLabel(inputs.witnessesOfFact.numClaimantWitnesses.label);
    await super.expectLabel(inputs.witnessesOfFact.numDefendantWitnesses.selector);

    await super.inputText('1', inputs.witnessesOfFact.numClaimantWitnesses.selector);
    await super.inputText('2', inputs.witnessesOfFact.numDefendantWitnesses.selector);
    await super.inputText(
      'party counts as witness',
      inputs.witnessesOfFact.partyCountedAsWitness.selector,
    );
  }

  async restrictNumPages() {
    await super.clickBySelector(radioButtons.witnessesOfFact.restrictNumPages.yes.selector);
    await super.expectLabel(inputs.witnessesOfFact.numPages.label);

    await super.inputText(
      'witness should be no more than',
      inputs.witnessesOfFact.witnessShouldNotMoreThanText.selector,
    );
    await super.inputText('13', inputs.witnessesOfFact.numPages.selector);
    await super.inputText('font size', inputs.witnessesOfFact.fontDetails.selector);
  }

  async addExpertEvidence() {
    await super.expectText(inputs.expertEvidence.label);
    await super.inputText('expert evidence', inputs.expertEvidence.selector);
  }

  async addAddendumReport() {
    await super.expectText(inputs.addendumReport.addendumReportUpload.label);

    const date = DateHelper.getToday();
    await super.inputText('addendum report', inputs.addendumReport.addendumReportUpload.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(date),
      inputs.addendumReport.addendumReportDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date),
      inputs.addendumReport.addendumReportDate.month.selector,
    );
    await super.inputText(
      date.getFullYear(),
      inputs.addendumReport.addendumReportDate.year.selector,
    );
  }

  async addFurtherAudiogram() {
    await super.expectText(inputs.furtherAudiogram.shallUndergoText.label);
    await super.expectText(inputs.furtherAudiogram.serviceReportText.label);

    const shallUndergoDate = DateHelper.getToday();
    const serviceReportDate = DateHelper.addToToday({ days: 1, workingDay: true });
    await super.inputText(
      'claimant shall undergo',
      inputs.furtherAudiogram.shallUndergoText.selector,
    );
    await super.inputText('service report', inputs.furtherAudiogram.serviceReportText.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(shallUndergoDate),
      inputs.furtherAudiogram.shallUndergoDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(shallUndergoDate),
      inputs.furtherAudiogram.shallUndergoDate.month.selector,
    );
    await super.inputText(
      shallUndergoDate.getFullYear(),
      inputs.furtherAudiogram.shallUndergoDate.year.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitDay(serviceReportDate),
      inputs.furtherAudiogram.serviceReportDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(serviceReportDate),
      inputs.furtherAudiogram.serviceReportDate.month.selector,
    );
    await super.inputText(
      serviceReportDate.getFullYear(),
      inputs.furtherAudiogram.serviceReportDate.year.selector,
    );
  }

  async addQuestionsClaimantExpert() {
    await super.expectText(inputs.questionsClaimantExpert.defendantMayAskText.label);
    await super.expectText(inputs.questionsClaimantExpert.questionsShallBeAnsweredText.label);
    await super.expectText(radioButtons.questionsClaimantExpert.label);

    const defendantMayAskDate = DateHelper.getToday();
    const questionsShallBeAnsweredDate = DateHelper.addToToday({ days: 1, workingDay: true });
    const applicationToRelyDetailsDate = DateHelper.addToToday({ days: 2, workingDay: true });
    await super.inputText(
      'defendant may ask questions',
      inputs.questionsClaimantExpert.defendantMayAskText.selector,
    );
    await super.inputText(
      'questions answered by',
      inputs.questionsClaimantExpert.questionsShallBeAnsweredText.selector,
    );
    await super.inputText(
      'uploaded to digital portal',
      inputs.questionsClaimantExpert.uploadToDigitalPortalText.selector,
    );
    await super.clickBySelector(radioButtons.questionsClaimantExpert.yes.selector);
    await super.inputText(
      'application to rely details',
      inputs.questionsClaimantExpert.applicationToRelyDetailsText.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitDay(defendantMayAskDate),
      inputs.questionsClaimantExpert.defendantMayAskDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(defendantMayAskDate),
      inputs.questionsClaimantExpert.defendantMayAskDate.month.selector,
    );
    await super.inputText(
      defendantMayAskDate.getFullYear(),
      inputs.questionsClaimantExpert.defendantMayAskDate.year.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitDay(questionsShallBeAnsweredDate),
      inputs.questionsClaimantExpert.questionsShallBeAnsweredDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(questionsShallBeAnsweredDate),
      inputs.questionsClaimantExpert.questionsShallBeAnsweredDate.month.selector,
    );
    await super.inputText(
      questionsShallBeAnsweredDate.getFullYear(),
      inputs.questionsClaimantExpert.questionsShallBeAnsweredDate.year.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitDay(applicationToRelyDetailsDate),
      inputs.questionsClaimantExpert.applicationToRelyDetailsDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(applicationToRelyDetailsDate),
      inputs.questionsClaimantExpert.applicationToRelyDetailsDate.month.selector,
    );
    await super.inputText(
      applicationToRelyDetailsDate.getFullYear(),
      inputs.questionsClaimantExpert.applicationToRelyDetailsDate.year.selector,
    );
  }

  async addPermissionDefendantRelyExpertEvidence() {
    await super.expectText(
      inputs.permissionDefendantRelyExpertEvidence.permissionToRelyOnExpertText.label,
    );
    await super.expectText(
      inputs.permissionDefendantRelyExpertEvidence.jointMeetingOfExpertsText.label,
    );

    const permissionToRelyOnExpertDate = DateHelper.getToday();
    const jointMeetingOfExpertsDate = DateHelper.addToToday({ days: 1, workingDay: true });
    await super.inputText(
      'permission to rely expert evidence',
      inputs.permissionDefendantRelyExpertEvidence.permissionToRelyOnExpertText.selector,
    );
    await super.inputText(
      'joint meeting of experts',
      inputs.permissionDefendantRelyExpertEvidence.jointMeetingOfExpertsText.selector,
    );
    await super.inputText(
      'upload to digital portal',
      inputs.permissionDefendantRelyExpertEvidence.uploadedToDigitalPortalText.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitDay(permissionToRelyOnExpertDate),
      inputs.permissionDefendantRelyExpertEvidence.permissionToRelyOnExpertDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(permissionToRelyOnExpertDate),
      inputs.permissionDefendantRelyExpertEvidence.permissionToRelyOnExpertDate.month.selector,
    );
    await super.inputText(
      permissionToRelyOnExpertDate.getFullYear(),
      inputs.permissionDefendantRelyExpertEvidence.permissionToRelyOnExpertDate.year.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitDay(jointMeetingOfExpertsDate),
      inputs.permissionDefendantRelyExpertEvidence.jointMeetingOfExpertsDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(jointMeetingOfExpertsDate),
      inputs.permissionDefendantRelyExpertEvidence.jointMeetingOfExpertsDate.month.selector,
    );
    await super.inputText(
      jointMeetingOfExpertsDate.getFullYear(),
      inputs.permissionDefendantRelyExpertEvidence.jointMeetingOfExpertsDate.year.selector,
    );
  }

  async addEvidenceExpertAcousticEngineer() {
    await super.expectText(inputs.evidenceExpertAcousticEngineer.instructionOfTheEvidence.label);
    await super.expectText(inputs.evidenceExpertAcousticEngineer.expertReport.label);
    await super.expectText(inputs.evidenceExpertAcousticEngineer.writtenQuestions.label);
    await super.expectText(inputs.evidenceExpertAcousticEngineer.replies.label1);
    await super.expectText(inputs.evidenceExpertAcousticEngineer.replies.label2);
    await super.expectText(inputs.evidenceExpertAcousticEngineer.serviceOfOrder.label);
    await super.expectText(paragraphs.paragraph7);
    await super.expectText(paragraphs.paragraph8);
    await super.expectText(paragraphs.paragraph9);
    await super.expectText(paragraphs.paragraph10);

    const instructionOfTheEvidenceDate = DateHelper.getToday();
    const expertReportDate = DateHelper.addToToday({ days: 1, workingDay: true });
    const writtenQuestionsDate = DateHelper.addToToday({ days: 2, workingDay: true });
    const repliesDate = DateHelper.addToToday({ days: 3, workingDay: true });
    await super.inputText(
      'instructions of the expert',
      inputs.evidenceExpertAcousticEngineer.instructionOfTheEvidence.selector,
    );
    await super.inputText(
      'instructions of the expert text',
      inputs.evidenceExpertAcousticEngineer.instructionOfTheEvidenceTextArea.selector,
    );
    await super.inputText(
      'expert report',
      inputs.evidenceExpertAcousticEngineer.expertReport.selector,
    );
    await super.inputText(
      'expert report digital portal',
      inputs.evidenceExpertAcousticEngineer.expertReportDigitalPortal.selector,
    );
    await super.inputText('replies', inputs.evidenceExpertAcousticEngineer.replies.selector);
    await super.inputText(
      'replies digital portal',
      inputs.evidenceExpertAcousticEngineer.repliesDigitalPortal.selector,
    );
    await super.inputText(
      'service of order',
      inputs.evidenceExpertAcousticEngineer.serviceOfOrder.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitDay(instructionOfTheEvidenceDate),
      inputs.evidenceExpertAcousticEngineer.instructionOfTheEvidenceDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(instructionOfTheEvidenceDate),
      inputs.evidenceExpertAcousticEngineer.instructionOfTheEvidenceDate.month.selector,
    );
    await super.inputText(
      instructionOfTheEvidenceDate.getFullYear(),
      inputs.evidenceExpertAcousticEngineer.instructionOfTheEvidenceDate.year.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitDay(expertReportDate),
      inputs.evidenceExpertAcousticEngineer.expertReportDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(expertReportDate),
      inputs.evidenceExpertAcousticEngineer.expertReportDate.month.selector,
    );
    await super.inputText(
      expertReportDate.getFullYear(),
      inputs.evidenceExpertAcousticEngineer.expertReportDate.year.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitDay(writtenQuestionsDate),
      inputs.evidenceExpertAcousticEngineer.writtenQuestionsDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(writtenQuestionsDate),
      inputs.evidenceExpertAcousticEngineer.writtenQuestionsDate.month.selector,
    );
    await super.inputText(
      writtenQuestionsDate.getFullYear(),
      inputs.evidenceExpertAcousticEngineer.writtenQuestionsDate.year.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitDay(repliesDate),
      inputs.evidenceExpertAcousticEngineer.repliesDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(repliesDate),
      inputs.evidenceExpertAcousticEngineer.repliesDate.month.selector,
    );
    await super.inputText(
      repliesDate.getFullYear(),
      inputs.evidenceExpertAcousticEngineer.repliesDate.year.selector,
    );
  }

  async addQuestionsToEntExpert() {
    await super.expectText(inputs.questionsToEntExpert.writtenQuestions.label);
    await super.expectText(inputs.questionsToEntExpert.questionsShallBeAnswered.label);
    await super.expectText(inputs.questionsToEntExpert.questionsShallBeAnsweredDigitalPortal.label);

    const writtenQuestionsDate = DateHelper.getToday();
    const questionsShallBeAnsweredDate = DateHelper.addToToday({ days: 1, workingDay: true });
    await super.inputText(
      'written questions',
      inputs.questionsToEntExpert.writtenQuestions.selector,
    );
    await super.inputText(
      'written questions digital portal',
      inputs.questionsToEntExpert.writtenQuestionsDigitalPortal.selector,
    );
    await super.inputText(
      'questions be answered',
      inputs.questionsToEntExpert.questionsShallBeAnswered.selector,
    );
    await super.inputText(
      'questions be answered digital portal',
      inputs.questionsToEntExpert.questionsShallBeAnsweredDigitalPortal.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitDay(writtenQuestionsDate),
      inputs.questionsToEntExpert.writtenQuestionsDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(writtenQuestionsDate),
      inputs.questionsToEntExpert.writtenQuestionsDate.month.selector,
    );
    await super.inputText(
      writtenQuestionsDate.getFullYear(),
      inputs.questionsToEntExpert.writtenQuestionsDate.year.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitDay(questionsShallBeAnsweredDate),
      inputs.questionsToEntExpert.questionsShallBeAnsweredDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(questionsShallBeAnsweredDate),
      inputs.questionsToEntExpert.questionsShallBeAnsweredDate.month.selector,
    );
    await super.inputText(
      questionsShallBeAnsweredDate.getFullYear(),
      inputs.questionsToEntExpert.questionsShallBeAnsweredDate.year.selector,
    );
  }

  async addScheduleOfLoss() {
    await super.expectText(inputs.scheduleOfLoss.claimant.label);
    await super.expectText(inputs.scheduleOfLoss.defendant.label);
    await super.expectLabel(radioButtons.scheduleOfLoss.label);

    const claimantDate = DateHelper.getToday();
    const defendantDate = DateHelper.addToToday({ days: 1, workingDay: true });
    await super.inputText('claimant', inputs.scheduleOfLoss.claimant.selector);
    await super.inputText('defendant', inputs.scheduleOfLoss.defendant.selector);
    await super.clickBySelector(radioButtons.scheduleOfLoss.yes.selector);
    await super.inputText('percuniary loss', inputs.scheduleOfLoss.percuniaryLoss.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(claimantDate),
      inputs.scheduleOfLoss.claimantDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(claimantDate),
      inputs.scheduleOfLoss.claimantDate.month.selector,
    );
    await super.inputText(
      claimantDate.getFullYear(),
      inputs.scheduleOfLoss.claimantDate.year.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitDay(defendantDate),
      inputs.scheduleOfLoss.defendantDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(defendantDate),
      inputs.scheduleOfLoss.defendantDate.month.selector,
    );
    await super.inputText(
      defendantDate.getFullYear(),
      inputs.scheduleOfLoss.defendantDate.year.selector,
    );
  }

  async addUploadOfDocuments() {
    await super.expectText(inputs.uploadOfDocuments.label);
    await super.inputText('upload of documents', inputs.uploadOfDocuments.selector);
  }

  async addNewDirection() {
    await super.clickBySelector(buttons.addNewDirection.selector);
    await super.expectLabel(inputs.newDirection.label);
    await super.inputText('new direction', inputs.newDirection.selector);
  }

  async addTrial() {
    await super.expectText(radioButtons.trial.trialOnOptions.label);
    await super.expectLabel(radioButtons.trial.trialOnOptions.openDate.label);
    await super.expectLabel(radioButtons.trial.trialOnOptions.trialWindow.label);
    await super.expectText(inputs.trial.listFrom.label);
    await super.expectText(radioButtons.trial.lengthOfTrial.oneHour.label);
    await super.expectText(radioButtons.trial.lengthOfTrial.oneHourThirtyMins.label);
    await super.expectText(radioButtons.trial.lengthOfTrial.twoHours.label);
    await super.expectText(radioButtons.trial.lengthOfTrial.threeHours.label);
    await super.expectText(radioButtons.trial.lengthOfTrial.fourHours.label);
    await super.expectText(radioButtons.trial.lengthOfTrial.fiveHours.label);
    await super.expectText(radioButtons.trial.lengthOfTrial.other.label);
    await super.expectText(paragraphs.paragraph11);
    await super.expectText(radioButtons.trial.hearingLocation.label1);
    await super.expectText(radioButtons.trial.hearingLocation.label2);
    await super.expectLabel(radioButtons.trial.hearingLocation.otherLocation.label);
    await super.expectText(radioButtons.trial.methodOfHearing.label);
    await super.expectText(radioButtons.trial.methodOfHearing.hintText);
    await super.expectLabel(radioButtons.trial.methodOfHearing.inPerson.label);
    await super.expectLabel(radioButtons.trial.methodOfHearing.telephone.label);
    await super.expectLabel(radioButtons.trial.methodOfHearing.video.label);
    await super.expectText(radioButtons.trial.physicalTrialBundle.label);
    await super.expectLabel(radioButtons.trial.physicalTrialBundle.none.label);
    await super.expectLabel(radioButtons.trial.physicalTrialBundle.party.label);
    await super.expectText(inputs.trial.bundleOfDocuments.label);
    await super.expectText(inputs.trial.hearingNotes.label1);
    await super.expectLabel(inputs.trial.hearingNotes.label2);

    await super.clickBySelector(radioButtons.trial.trialOnOptions.trialWindow.selector);
    await super.expectText(inputs.trial.dateTo.label);

    await super.clickBySelector(radioButtons.trial.lengthOfTrial.other.selector);
    await super.expectLabel(inputs.trial.trialLengthDays.label);
    await super.expectLabel(inputs.trial.trialLengthHours.label);
    await super.expectLabel(inputs.trial.trialLengthMinutes.label);

    const listFrom = DateHelper.getToday();
    const dateTo = DateHelper.addToToday({ days: 1, workingDay: true });
    await super.inputText(DateHelper.getTwoDigitDay(listFrom), inputs.trial.listFrom.day.selector);
    await super.inputText(
      DateHelper.getTwoDigitMonth(listFrom),
      inputs.trial.listFrom.month.selector,
    );
    await super.inputText(listFrom.getFullYear(), inputs.trial.listFrom.year.selector);
    await super.inputText(DateHelper.getTwoDigitDay(dateTo), inputs.trial.dateTo.day.selector);
    await super.inputText(DateHelper.getTwoDigitMonth(dateTo), inputs.trial.dateTo.month.selector);
    await super.inputText(dateTo.getFullYear(), inputs.trial.dateTo.year.selector);
    await super.inputText('1', inputs.trial.trialLengthDays.selector);
    await super.inputText('8', inputs.trial.trialLengthHours.selector);
    await super.inputText('30', inputs.trial.trialLengthMinutes.selector);
    await super.inputText('bundle of documents', inputs.trial.bundleOfDocuments.selector);
    await super.inputText('hearing notes', inputs.trial.hearingNotes.selector);
  }

  async addWelshLanguage() {
    await super.clickBySelector(checkboxes.includeWelshLanguage.selector);
    await super.expectText(paragraphs.paragraph12);
  }

  async addImportantNotes() {
    const date = DateHelper.getToday();
    await super.inputText('important notes', inputs.importantNotes.importantNotesText.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(date),
      inputs.importantNotes.importantNotesDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date),
      inputs.importantNotes.importantNotesDate.month.selector,
    );
    await super.inputText(
      date.getFullYear(),
      inputs.importantNotes.importantNotesDate.year.selector,
    );
  }

  async submit(...args: any[]): Promise<void> {
    await super.retryClickSubmit();
  }
}
