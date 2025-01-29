import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { subheadings, paragraphs, inputs } from './interest-from-specific-date-content';

@AllMethodsStep()
export default class InterestFromSpecificDate extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectText(subheadings.interestFromSpecificDate),
      super.expectText(paragraphs.interestFromSpecificDateDescriptionText)
    ]);
  }

  async enterFromSpecificDate() {
    await super.inputText('22', inputs.enterDate.day.selector);
    await super.inputText('04', inputs.enterDate.month.selector);
    await super.inputText('2023', inputs.enterDate.year.selector);
  }

  async enterinterestFromSpecificDateDescription() {
    await super.inputText('Test description', inputs.interestFromSpecificDateDescription.selector);
  }

  async submit() {
    await super.clickSubmit();
  }
}