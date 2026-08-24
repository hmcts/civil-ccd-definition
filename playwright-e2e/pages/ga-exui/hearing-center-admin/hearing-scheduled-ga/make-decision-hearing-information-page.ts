import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import GaCCDCaseData from '../../../../models/ga-ccd-case-data';
import GaExuiPage from '../../mixin-pages/ga-exui-page/ga-exui-page';
import { inputs } from './make-decision-hearing-information-content';

@AllMethodsStep()
export default class MakeDecisionHearingInformationPage extends GaExuiPage(BasePage) {
  async verifyContent(gaCaseData: GaCCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(gaCaseData),
      super.expectLabel(inputs.information.label),
      super.expectSelector(inputs.information.selector),
    ]);
  }
  async enterInformation() {
    await super.inputText('Test Notice info', inputs.information.selector);
  }
  async submit() {
    await super.retryClickSubmit();
  }
}
