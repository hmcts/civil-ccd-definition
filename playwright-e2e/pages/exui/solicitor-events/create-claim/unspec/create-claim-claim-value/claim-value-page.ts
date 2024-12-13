import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { formFields, labels, paragraphs, subHeadings } from './claim-value-content';

@AllMethodsStep()
export default class ClaimValuePage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(subHeadings.claimValue),
      super.expectText(paragraphs.feeCalculation),
      super.expectText(labels.statementOfValue, { ignoreDuplicates: true }),
      super.expectSelector(formFields.claimValue),
    ]);
  }

  async fillDetails() {
    await super.inputText('1000', formFields.claimValue);
  }

  async submit() {
    await super.clickSubmit();
  }
}
