import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import GaCCDCaseData from '../../../../models/ga-ccd-case-data';
import GaExuiPage from '../../mixin-pages/ga-exui-page/ga-exui-page';
import { heading, paragraphs } from './make-decision-confirm-content';

@AllMethodsStep()
export default class MakeDecisionConfirmPage extends GaExuiPage(BasePage) {
  async verifyContent(gaCaseData: GaCCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(gaCaseData),
      super.expectHeading(heading),
      super.expectText(paragraphs.orderSentTo),
    ]);
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
