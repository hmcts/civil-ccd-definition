import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../../exui-page/exui-page';
import { heading, radioButtons, inputs } from './create-case-flags-special-measure-content';

@AllMethodsStep()
export default class CreateCaseFlagsSpecialMeasurePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(heading),
      super.expectLabel(radioButtons.screeningWitness.label),
      super.expectLabel(radioButtons.evidenceByLink.label),
      super.expectLabel(radioButtons.other.label),
    ]);
  }

  async selectOther() {
    await super.clickByLabel(radioButtons.other.label);
    await super.inputText('New flag type', inputs.other.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
