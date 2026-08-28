import BasePage from "../../../base/base-page";
import config from "../../../config/config";
import { AllMethodsStep } from "../../../decorators/test-steps";
import User from "../../../models/users/user";
import IdamPage from "../mixin-pages/idam-page/idam-page";
import { inputs } from "./enter-password-content";

@AllMethodsStep()
export default class EnterPasswordPage extends IdamPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectLabel(inputs.password.label, {timeout: config.idam.pageSubmitTimeout}),
    ]);
  }

  async enterPassword(user: User) {
    console.log(`Entering password for authentication by Idam, user: ${user.name}`);
    await super.inputSensitiveText(user.password, inputs.password.selector);
  }

  async submit(user: User) {
    await super.retryClickContinue(async () => super.expectNoSelector(inputs.password.selector));
  }
}