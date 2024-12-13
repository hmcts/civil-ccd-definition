import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page';
import { formFields, labels, subHeadings } from './statement-of-truth-content.ts';

@AllMethodsStep()
export default class StatementOfTruthPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectText(subHeadings.statementOfTruth, { ignoreDuplicates: true }),
      super.expectText(labels.fullName),
      super.expectText(labels.role),
    ]);
  }

  async fillDetails() {
    const fullName = 'John Doe';
    const role = 'Solicitor';
    await super.inputText(role, formFields.role);
    await super.inputText(fullName, formFields.name);
  }

  async submit() {
    await super.clickSubmit();
  }
}
