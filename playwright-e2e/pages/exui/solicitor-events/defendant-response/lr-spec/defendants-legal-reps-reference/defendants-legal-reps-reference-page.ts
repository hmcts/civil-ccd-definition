import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import {
  heading,
  form,
  tableHeading,
  organisation,
  caseAssignedRole,
  dob,
  radioButtons,
} from './defendants-legal-reps-reference-content.ts';

@AllMethodsStep()
export default class DefendantResponseDefendantsLegalRepsReferencePage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectHeading(heading),
      super.expectLabel(form.label),
      super.expectText(tableHeading),
      super.expectText(organisation),
      super.expectText(caseAssignedRole),
      super.expectText(dob.label),
      super.expectLabel(dob.day.label),
      super.expectLabel(dob.month.label),
      super.expectLabel(dob.year.label),
      super.expectLabel(radioButtons.yes.label),
      super.expectLabel(radioButtons.no.label),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
