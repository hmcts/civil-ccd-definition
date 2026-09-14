import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import GaCCDCaseData from '../../../../../models/ga-ccd-case-data';
import GaExuiPage from '../../../mixin-pages/ga-exui-page/ga-exui-page';
import { radioButtons } from './final-order-select-ga-content';

@AllMethodsStep()
export default class FinalOrderSelectGaPage extends GaExuiPage(BasePage) {
  async verifyContent(gaCaseData: GaCCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(gaCaseData),
      super.expectSubheading(radioButtons.orderType.label, { headingLevel: 3 }),
      super.expectLabel(radioButtons.orderType.assistedOrder.label),
    ]);
  }

  async selectAssistedOrder() {
    await super.clickBySelector(radioButtons.orderType.assistedOrder.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
