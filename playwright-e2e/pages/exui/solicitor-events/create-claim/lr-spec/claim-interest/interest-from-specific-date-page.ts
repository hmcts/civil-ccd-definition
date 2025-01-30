import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { subheadings, paragraphs, inputs } from './interest-from-specific-date-content';
import DateFragment from '../../../../fragments/date/date-fragment';
import DateHelper from '../../../../../../helpers/date-helper';

@AllMethodsStep()
export default class InterestFromSpecificDate extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;

  async verifyContent() {
    await super.runVerifications([
      super.expectText(subheadings.interestFromSpecificDate),
      super.expectText(paragraphs.interestFromSpecificDateDescriptionText),
    ]);
  }

  async enterFromSpecificDate() {
    const date = DateHelper.subtractFromToday({ months: 6 });
    await this.dateFragment.enterDate(date, inputs.interestFromSpecificDate.selectorKey);
  }

  async enterinterestFromSpecificDateDescription() {
    await super.inputText('Test description', inputs.interestFromSpecificDateDescription.selector);
  }

  async submit() {
    await super.clickSubmit();
  }
}
