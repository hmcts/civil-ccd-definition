import BasePage from "../../../base/base-page";
import config from "../../../config/config";
import urls from "../../../config/urls";
import { AllMethodsStep } from "../../../decorators/test-steps";
import User from "../../../models/users/user";
import IdamPage from "../mixin-pages/idam-page/idam-page";
import { inputs, buttons } from "./enter-email-content";

@AllMethodsStep()
export default class EnterEmailPage extends IdamPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectLabel(inputs.email.label, {timeout: config.idam.pageSubmitTimeout}),
    ]);
  }

  async openManageCase() {
    await super.retryGoTo(
      urls.manageCase,
      () =>
        super.expectLabel(inputs.email.label, { timeout: config.idam.pageSubmitTimeout }),
      undefined,
      { retries: 1 },
    );
  }

  async enterEmail(user: User) {
    console.log(`Entering email for authentication by Idam, user: ${user.name}`);
    await super.inputText(user.email, inputs.email.selector);
  }

  async submit() {
    await super.retryClickContinue(
      async () => super.expectNoSelector(inputs.email.selector, {timeout: config.idam.pageSubmitTimeout}),
    )
  }
}