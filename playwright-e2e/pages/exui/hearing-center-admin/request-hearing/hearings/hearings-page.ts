import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import { headings, links, buttons } from './hearings-content';

@AllMethodsStep()
export default class HearingsPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.expectText(headings.currentAndUpcoming);
    await super.expectText(headings.pastOrCancelled);
  }

  async requestHearing() {
    await super.clickByText(links.requestHearing.label);
  }

  async viewDetails() {
    await super.clickBySelector(buttons.viewDetails.selector);
  }

  async cancel() {
    await super.clickBySelector(buttons.cancel.selector);
  }

  async submit() {
    // not needed???
  }
}
