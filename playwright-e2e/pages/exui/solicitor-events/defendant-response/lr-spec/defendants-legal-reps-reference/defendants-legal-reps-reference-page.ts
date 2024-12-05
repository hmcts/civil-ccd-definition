import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import {
  heading,
  form,
  tableHeading,
  organisation,
  caseAssignedRole,
  reference,
  dob,
  radioButtons,
  radioButtons1v2,
} from './defendants-legal-reps-reference-content.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class DefendantsLegalRepsReferencePage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      //super.verifyHeadings(ccdCaseData),
      //super.expectSubheading(heading),
      super.expectLabel(form.label),
      super.expectText(radioButtons.yes.label, { ignoreDuplicates: true }),
      super.expectText(radioButtons.no.label, { ignoreDuplicates: true }),
    ]);
  }

  async verifyContent1v1(ccdCaseData: CCDCaseData) {
    super.expectText(tableHeading, { ignoreDuplicates: true }),
      super.expectText(organisation, { ignoreDuplicates: true }),
      super.expectText(caseAssignedRole, { ignoreDuplicates: true }),
      super.expectText(reference, { ignoreDuplicates: true }),
      super.expectText(dob.label, { ignoreDuplicates: true }),
      super.expectText(dob.day.label, { ignoreDuplicates: true }),
      super.expectText(dob.month.label, { ignoreDuplicates: true }),
      super.expectText(dob.year.label, { ignoreDuplicates: true });
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.yes.selector);
  }

  async selectYes1v2() {
    await super.clickBySelector(radioButtons1v2.yes.selector);
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.no.selector);
  }

  async selectNo1v2() {
    await super.clickBySelector(radioButtons1v2.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
