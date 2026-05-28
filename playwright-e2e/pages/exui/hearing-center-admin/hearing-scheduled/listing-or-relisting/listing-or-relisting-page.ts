import BasePage from '../../../../../base/base-page.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import { radios } from './listing-or-relisting-content.ts';

@AllMethodsStep()
export default class ListingOrRelistingPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectLabel(radios.listing),
      super.expectLabel(radios.relisting),
    ]);
  }
  async selectListing() {
    await super.clickByLabel(radios.listing, { exact: true });
  }
  async submit() {
    await super.retryClickSubmit();
  }
}
