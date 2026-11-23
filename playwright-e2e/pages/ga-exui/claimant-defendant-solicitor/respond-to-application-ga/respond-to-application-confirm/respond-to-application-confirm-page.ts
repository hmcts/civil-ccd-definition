import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import GaCCDCaseData from '../../../../../models/ga-ccd-case-data';
import GaExuiPage from '../../../mixin-pages/ga-exui-page/ga-exui-page';
import { heading } from './respond-to-application-confirm-content';

@AllMethodsStep()
export default class RespondToApplicationConfirmPage extends GaExuiPage(BasePage) {
  async verifyContent(gaCaseData: GaCCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(gaCaseData),
      super.expectHeading(heading.confirmation),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
