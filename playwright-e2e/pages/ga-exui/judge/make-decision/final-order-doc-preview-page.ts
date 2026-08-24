import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import GaCCDCaseData from '../../../../models/ga-ccd-case-data';
import GaExuiPage from '../../mixin-pages/ga-exui-page/ga-exui-page';
import { headings, paragraph } from './final-order-doc-preview-content';
import { getFormattedCaseId } from '../../mixin-pages/ga-exui-page/ga-exui-content';

@AllMethodsStep()
export default class FinalOrderDocPreviewPage extends GaExuiPage(BasePage) {
  async verifyContent(gaCaseData: GaCCDCaseData) {
    await super.runVerifications([
      super.expectHeading(headings.previewdFinalOrderDocument),
      super.expectHeading(getFormattedCaseId(gaCaseData.id!), { exact: false }),
      super.expectHeading(gaCaseData.caseNameGaInternal!, { exact: false }),
      super.expectText(paragraph.draftOrder),
      super.expectButton('.pdf', { exact: false }),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
