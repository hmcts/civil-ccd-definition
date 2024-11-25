import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiEvent from '../../../exui-event/exui-event';
import {
  heading,
  form,
  tableHeading,
  organisation,
  caseAssignedRole,
  dob,
  radioButtons,
} from './defendant-response-defendants-legal-reps-reference-content.ts';

@AllMethodsStep()
export default class DefendantResponseDefendantsLegalRepsReferencePage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectHeading(heading),
      super.expectForm(form),
      super.expectText(tableHeading),
      super.expectText(organisation),
      super.expectText(caseAssignedRole),
      super.expectText(dob.label),
      super.expectForm(dob.day),
      super.expectForm(dob.month),
      super.expectForm(dob.year),
      super.expectRadioButton(radioButtons.yes),
      super.expectRadioButton(radioButtons.no),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
