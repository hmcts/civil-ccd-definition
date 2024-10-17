import BasePage from '../../base/base-page';
import User from '../../types/user';
import { AllMethodsStep } from '../../decorators/test-steps';
import { acceptIdamCookies } from '../../fixtures/cookies/idam-cookies';
import { generateAcceptExuiCookies } from '../../fixtures/cookies/exui-cookies';
import PageError from '../../errors/page-error';
import CookiesHelper from '../../helpers/cookies-helper';
import UserStateHelper from '../../helpers/users-state-helper';
import filePaths from '../../config/file-paths';

@AllMethodsStep()
export default class PageCookiesManager extends BasePage {
  async verifyContent(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async saveCookies(user: User) {
    const cookies = await super.getCookies();
    user.cookiesPath = `${filePaths.userCookies}/${user.key}.json`;
    CookiesHelper.writeCookies(cookies, user.cookiesPath);
    UserStateHelper.addUserToState(user);
  }

  async cookiesLogin(user: User, isTeardown: boolean) {
    console.log(
      `Authenticating ${user.key} with email ${user.email} by setting cookies stored in path: ${user.cookiesPath}`,
    );
    const cookies = await CookiesHelper.getCookies(user.cookiesPath, isTeardown);
    await super.addCookies(cookies);
  }

  async addIdamCookies() {
    await super.addCookies(acceptIdamCookies);
  }

  async addExuiCookies({ userId, email }: User) {
    if (!userId) {
      throw new PageError(`UserId for user with email ${email} is invalid`);
    }
    await super.addCookies(generateAcceptExuiCookies(userId));
  }

  async cookiesSignOut() {
    await super.clearCookies();
  }
}
