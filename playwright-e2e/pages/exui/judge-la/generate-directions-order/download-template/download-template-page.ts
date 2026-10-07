import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd-case-data';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page';
import { heading, subheading, buttons, paragraphs } from './download-template-content';
import { getFormattedCaseId } from '../../../mixin-pages/exui-page/exui-content.ts';

@AllMethodsStep()
export default class DownloadTemplatePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectCaseHeading(getFormattedCaseId(ccdCaseData.id!)),
      super.expectCaseHeading(ccdCaseData.caseNamePublic!),
      super.expectButton(buttons.downloadTemplate, { exact: false }),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
