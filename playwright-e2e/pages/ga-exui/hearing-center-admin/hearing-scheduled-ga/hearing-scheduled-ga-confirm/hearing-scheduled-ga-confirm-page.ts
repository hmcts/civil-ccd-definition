import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import GaCCDCaseData from '../../../../../models/ga-ccd-case-data';
import GaExuiPage from '../../../mixin-pages/ga-exui-page/ga-exui-page';
import { heading, paragraphs } from './hearing-scheduled-ga-confirm-content';

@AllMethodsStep()
export default class HearingScheduledGaConfirmPage extends GaExuiPage(BasePage) {
  async verifyContent(gaCaseData: GaCCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(gaCaseData),
      super.expectHeading(heading),
      super.expectText(paragraphs.line1),
      super.expectText(paragraphs.line2),
    ]);
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
