import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import {
  buttons,
  formFields,
  hints,
  labels,
  paragraphs,
  subHeadings,
} from './claim-amount-spec-content';

@AllMethodsStep()
export default class ClaimAmountSpecPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectSubheading(subHeadings.claimAmount),
      super.expectText(paragraphs.claimAmountInfo),
      super.expectText(buttons.addNew),
    ]);
  }

  async clickAddNew() {
    await super.clickByText(buttons.addNew);
  }

  async verifyAdditionalContent() {
    await super.runVerifications([
      super.expectText(labels.whatYouAreClaimingFor),
      super.expectText(hints.explainEachItem),
      super.expectText(labels.amount, { ignoreDuplicates: true }),
    ]);
  }

  async fillClaimDetails() {
    await super.inputText('Test reason', formFields.claimReason);
    await super.inputText('1000', formFields.claimAmount);
  }

  async submit() {
    await super.clickSubmit();
  }
}
