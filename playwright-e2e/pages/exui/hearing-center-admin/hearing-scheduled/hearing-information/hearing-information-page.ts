import BasePage from '../../../../../base/base-page.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import { inputs } from './hearing-information-content.ts';

@AllMethodsStep()
export default class HearingInformationPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([super.expectLabel(inputs.moreInformation)]);
  }
  async enterMoreInformation() {
    await super.inputTextByLabel('More information about the hearing', inputs.moreInformation);
  }
  async submit() {
    await super.retryClickSubmit();
  }
}
