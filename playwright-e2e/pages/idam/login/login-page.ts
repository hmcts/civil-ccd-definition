import urls from '../../../config/urls';
import User from '../../../models/user';
import BasePage from '../../../base/base-page';
import { inputs, buttons } from './login-page-content';
import { AllMethodsStep } from '../../../decorators/test-steps';
import config from '../../../config/config';

@AllMethodsStep({ methodNamesToIgnore: ['login'] })
export default class LoginPage extends BasePage {
  async verifyContent() {
    await super.retryReloadRunVerifications(() => [
      // super.expectText(heading),
      super.expectLabel(inputs.email.label, { timeout: config.playwright.shortExpectTimeout }),
      super.expectLabel(inputs.password.label),
    ]);
  }

  private async login({ name, email, password }: User) {
    console.log(`Authenticating user: ${name} by Idam`);
    await super.inputText(email, inputs.email.selector);
    await super.inputSensitiveText(password, inputs.password.selector);
    await super.clickBySelector(buttons.submit.selector);
  }

  async openManageCase() {
    await super.goTo(urls.manageCase);
  }

  async citizenLogin(user: User) {
    await this.login(user);
    await super.expectUrlEnd(['/dashboard', '/eligibility']);
  }

  async manageCaseLogin(user: User) {
    await this.login(user);
    if (!user.wa) await super.expectUrlEnd('/cases');
    else
      await super.expectUrlEnd('/work/my-work/list', {
        message: `User: ${user.email} has WA enabled`,
      });
  }
}
