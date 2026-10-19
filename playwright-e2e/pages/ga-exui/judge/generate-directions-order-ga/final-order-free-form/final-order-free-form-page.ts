import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import GaCCDCaseData from '../../../../../models/ga-ccd-case-data';
import GaExuiPage from '../../../mixin-pages/ga-exui-page/ga-exui-page';
import { inputs, radioButtons, subheadings } from './final-order-free-form-content';

@AllMethodsStep()
export default class FinalOrderFreeFormPage extends GaExuiPage(BasePage) {
  async verifyContent(gaCaseData: GaCCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(gaCaseData),
      super.expectSubheading(subheadings.recitalsAndOrder),
      super.expectSubheading(subheadings.order),
      super.expectLabel(radioButtons.orderMadeOn.withoutNotice.label),
    ]);
  }

  async enterOrderDetailsWithoutNotice() {
    await super.inputText('Test recitals', inputs.recitals);
    await super.inputText('Test order', inputs.order);
    await super.clickBySelector(radioButtons.orderMadeOn.withoutNotice.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
