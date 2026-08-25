import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import GaCCDCaseData from '../../../../../models/ga-ccd-case-data';
import GaExuiPage from '../../../mixin-pages/ga-exui-page/ga-exui-page';
import { subheading } from './hearing-scheduled-ga-submit-content';

@AllMethodsStep()
export default class HearingScheduledGaSubmitPage extends GaExuiPage(BasePage) {
  async verifyContent(gaCaseData: GaCCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(gaCaseData),
      super.expectSubheading(subheading.checkYourAnswers),
    ]);
  }
  async submit() {
    await super.retryClickSubmit();
  }
}
