import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd-case-data';
import { heading } from './hearing-submit-content';

@AllMethodsStep()
export default class HearingSubmitPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectText(`${ccdCaseData.caseNamePublic}`, { exact: false }),
      super.expectHeading(heading),
    ]);
  }

  async submit() {
    await super.submitRequest();
  }
}
