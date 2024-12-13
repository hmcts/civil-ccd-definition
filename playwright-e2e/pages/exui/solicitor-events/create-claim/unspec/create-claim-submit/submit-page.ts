import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { subHeadings } from './submit-content';

@AllMethodsStep()
export default class SubmitPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(subHeadings.checkYourAnswers),
      super.expectText(subHeadings.checkInformation),
    ]);
  }

  async submit() {
    await super.clickSubmit();
  }
}
