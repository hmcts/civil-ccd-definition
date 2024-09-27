import BasePageFactory from '../../base/base-page-factory';
import CreateAccountPage from './create-account/create-account-page';
import IdamCookiesBanner from './idam-cookies-banner.ts/idam-cookies-banner';
import LoginPage from './login/login-page';

export default class IdamPageFactory extends BasePageFactory {
  get loginPage() {
    return new LoginPage(this.page, this.axeBuilder);
  }

  get idamsCookiesBanner() {
    return new IdamCookiesBanner(this.page, this.axeBuilder);
  }

  get createAccountPage() {
    return new CreateAccountPage(this.page, this.axeBuilder);
  }
}
