import urls from '../../../config/urls';
import User from '../../../models/users/user';
import BasePage from '../../../base/base-page';
import { legacyUi, hmctsAccessUi, anyUiEmailSelector } from './login-page-content';
import { AllMethodsStep } from '../../../decorators/test-steps';
import config from '../../../config/config';

@AllMethodsStep({ methodNamesToIgnore: ['login'] })
export default class LoginPage extends BasePage {
  /*
   * IDAM is mid-migration to the HMCTS Access UI, so the login journey differs by
   * environment: one page on the legacy UI, two pages on HMCTS Access. Detect from
   * the DOM rather than the environment name, so a routing switch needs no code change.
   * See DTSCCI-6142.
   */
  private async isHmctsAccessUi(): Promise<boolean> {
    return (await super.countBySelector(hmctsAccessUi.enterEmail.input.selector)) > 0;
  }

  async verifyContent() {
    if (await this.isHmctsAccessUi()) {
      await super.runVerifications([super.expectLabel(hmctsAccessUi.enterEmail.input.label)]);
    } else {
      await super.runVerifications([
        super.expectLabel(legacyUi.inputs.email.label),
        super.expectLabel(legacyUi.inputs.password.label),
      ]);
    }
  }

  private async login({ name, email, password }: User) {
    console.log(`Authenticating user: ${name} by Idam`);
    if (await this.isHmctsAccessUi()) {
      await this.hmctsAccessLogin(email, password);
    } else {
      await super.inputText(email, legacyUi.inputs.email.selector);
      await super.inputSensitiveText(password, legacyUi.inputs.password.selector);
      await super.clickBySelector(legacyUi.buttons.submit.selector);
    }
  }

  private async hmctsAccessLogin(email: string, password: string) {
    await super.inputText(email, hmctsAccessUi.enterEmail.input.selector);
    await super.clickBySelector(hmctsAccessUi.enterEmail.submit.selector);
    // The password field only exists once the email step has been accepted.
    await super.expectSelector(hmctsAccessUi.enterPassword.input.selector, {
      message: `Password step was not reached after submitting email for user: ${email}`,
      timeout: config.exui.pageSubmitTimeout,
    });
    await super.inputSensitiveText(password, hmctsAccessUi.enterPassword.input.selector);
    await super.clickBySelector(hmctsAccessUi.enterPassword.submit.selector);
  }

  async openManageCase() {
    await super.retryGoTo(
      urls.manageCase,
      () =>
        super.expectSelector(anyUiEmailSelector, {
          timeout: config.playwright.shortExpectTimeout,
        }),
      undefined,
      { retries: 2 },
    );
  }

  async citizenLogin(user: User) {
    await this.login(user);
    await super.expectUrlEnd(['/dashboard', '/eligibility']);
  }

  async manageCaseLogin(user: User) {
    await super.retryAction(
      async () => this.login(user),
      async () => {
        if (!user.wa)
          await super.expectUrlEnd('/cases', { timeout: config.exui.pageSubmitTimeout });
        else
          await super.expectUrlEnd('/work/my-work/list', {
            message: `User: ${user.email} has WA enabled`,
            timeout: config.exui.pageSubmitTimeout,
          });
      },
      async () => {
        await this.openManageCase();
      },
      { retries: 2, message: `Login for user: ${user.name} failed, trying again` },
    );
  }
}
