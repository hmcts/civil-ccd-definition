import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import GaCCDCaseData from '../../../../../models/ga-ccd-case-data';
import GaExuiPage from '../../../mixin-pages/ga-exui-page/ga-exui-page';
import { radioButtons, subheading } from './resp-screen-content';

@AllMethodsStep()
export default class RespScreenPage extends GaExuiPage(BasePage) {
  async verifyContent(gaCaseData: GaCCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(gaCaseData),
      super.expectSubheading(subheading.agreement),
      super.expectLabel(radioButtons.yes.label),
       super.expectLabel(radioButtons.no.label),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.yes.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
