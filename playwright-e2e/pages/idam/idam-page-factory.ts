import BasePageFactory from '../../base/base-page-factory';
import CreateAccountPage from './create-account/create-account-page';
import EnterEmailPage from './enter-email/enter-email-page';
import EnterPasswordPage from './enter-password/enter-password-page';
import IdamCookiesBanner from './idam-cookies-banner.ts/idam-cookies-banner';
import LoginPage from './login/login-page';

export default class IdamPageFactory extends BasePageFactory {
  get loginPage() {
    return new LoginPage(this.page);
  }

  get enterEmailPage() {
    return new EnterEmailPage(this.page);
  }

  get enterPasswordPage() {
    return new EnterPasswordPage(this.page);
  }

  get idamsCookiesBanner() {
    return new IdamCookiesBanner(this.page);
  }

  get createAccountPage() {
    return new CreateAccountPage(this.page);
  }
}
