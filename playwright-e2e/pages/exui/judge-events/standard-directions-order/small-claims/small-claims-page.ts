import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiEvent from '../../../exui-event/exui-event';
import {
  creditHireContent,
  dropdowns,
  heading,
  inputs,
  paragraphs,
  radioButtons,
  subheadings,
  witnessStatementContent,
} from './small-claims-content';

@AllMethodsStep()
export default class SmallClaimsPage extends ExuiEvent(BasePage) {
  async verifyContent(...args: any[]): Promise<void> {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectHeading(heading),
      super.expectSubheading(subheadings.judgesRecital),
      super.expectSubheading(subheadings.allocation),
      super.expectText(paragraphs.paragraph1),
      super.expectSubheading(subheadings.importantNotes),
      super.expectText(paragraphs.paragraph2),
      super.expectSubheading(subheadings.addNewDirection),
    ]);
  }

  async verifyWarning() {
    await super.expectText(paragraphs.paragraph3);
    await super.expectText(paragraphs.paragraph4);
  }

  async verifyHearingTime() {
    await super.expectSubheading(subheadings.hearingTime);
    await super.expectText(inputs.hearingTime.dateFrom.label);
    await super.expectText(inputs.hearingTime.dateTo.label);
    await super.expectText(radioButtons.hearingTime.label);
    await super.expectLabel(radioButtons.hearingTime.thirtyMins.label);
    await super.expectLabel(radioButtons.hearingTime.oneHour.label);
    await super.expectLabel(radioButtons.hearingTime.oneHourThirtyMins.label);
    await super.expectLabel(radioButtons.hearingTime.twoHours.label);
    await super.expectLabel(radioButtons.hearingTime.twohoursThirtyMins.label);
    await super.expectLabel(radioButtons.hearingTime.other.label);
  }

  async verifyHearingMethod() {
    await super.expectSubheading(subheadings.hearingMethod);
    await super.expectLabel(radioButtons.hearingMethod.label);
    await super.expectLabel(radioButtons.hearingMethod.inPerson.label);
    await super.expectLabel(radioButtons.hearingMethod.telephone.label);
    await super.expectLabel(dropdowns.hearingLocation.label);
  }

  async verifyHearingNotes() {
    await super.expectSubheading(subheadings.hearingNotes);
    await super.expectText(inputs.hearingNotes.hintText);
  }

  async verifyWitnessStatement() {
    await super.expectSubheading(subheadings.witnessStatement);
    await super.expectLabel(inputs.witnessStatement.label);
    await super.expectText(witnessStatementContent.paragraph1);
    await super.expectText(witnessStatementContent.paragraph2);
  }

  async verifyDocuments() {
    await super.expectSubheading(subheadings.documents);
  }

  async verifyFlightDelay() {
    await super.expectSubheading(subheadings.flightDelay);
    await super.expectSubheading(subheadings.relatedClaims);
    await super.expectSubheading(subheadings.legalArguments);
  }

  async verifyCreditHire() {
    await super.expectText(creditHireContent.paragraph1);
    await super.expectText(creditHireContent.paragraph2);
  }

  async verifyRoadTrafficAccident() {
    await super.expectSubheading(subheadings.roadTrafficAccident);
  }

  async submit(...args: any[]): Promise<void> {
    await super.retryClickSubmit();
  }
}
