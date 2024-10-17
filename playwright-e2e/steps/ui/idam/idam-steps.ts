import User from '../../../models/user';
import config from '../../../config/config';
import IdamPageFactory from '../../../pages/idam/idam-page-factory';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-data';
import PageUtilsFactory from '../../../pages/utils/page-utils-factory';
import BaseApiSteps from '../../../base/base-api-steps';
import RequestsFactory from '../../../requests/requests-factory';
import exuiUsers from '../../../config/users/exui-users';
import CookiesHelper from '../../../helpers/cookies-helper';

@AllMethodsStep({ methodNamesToIgnore: ['exuiLogin'] })
export default class IdamSteps extends BaseApiSteps {
  private isSetupTest: boolean;
  private isTeardownTest: boolean;
  private verifyCookiesBanner: boolean;
  private pageUtilsFactory: PageUtilsFactory;
  private idamPageFactory: IdamPageFactory;

  constructor(
    pageUtilsFactory: PageUtilsFactory,
    idamPageFactory: IdamPageFactory,
    requestsFactory: RequestsFactory,
    isSetupTest: boolean,
    isTeardownTest: boolean,
    verifyCookiesBanner: boolean,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.isSetupTest = isSetupTest;
    this.isTeardownTest = isTeardownTest;
    this.verifyCookiesBanner = verifyCookiesBanner;
    this.pageUtilsFactory = pageUtilsFactory;
    this.idamPageFactory = idamPageFactory;
  }

  async ClaimantSolicitorLogin() {
    await this.exuiLogin(exuiUsers.claimantSolicitorUser);
  }

  async ClaimantSolicitorBulkScanLogin() {
    await this.exuiLogin(exuiUsers.claimantSolicitorBulkScanUser);
  }

  async DefendantSolicitor1Login() {
    await this.exuiLogin(exuiUsers.defendantSolicitor1User);
  }

  async DefendantSolicitor2Login() {
    await this.exuiLogin(exuiUsers.defendantSolicitor2User);
  }

  async CivilAdminLogin() {
    await this.exuiLogin(exuiUsers.civilAdminUser);
  }

  async NBCRegion1Login() {
    await this.exuiLogin(exuiUsers.nbcRegion1User);
  }

  async NBCRegion2Login() {
    await this.exuiLogin(exuiUsers.nbcRegion2User);
  }

  async NBCRegion4Login() {
    await this.exuiLogin(exuiUsers.nbcRegion4User);
  }

  async JudgeRegion1Login() {
    await this.exuiLogin(exuiUsers.judgeRegion1User);
  }

  async JudgeRegion2Login() {
    await this.exuiLogin(exuiUsers.judgeRegion2User);
  }

  async JudgeRegion4Login() {
    await this.exuiLogin(exuiUsers.judgeRegion4User);
  }

  async HearingCentreAdmin1Login() {
    await this.exuiLogin(exuiUsers.hearingCenterAdminRegion1User);
  }

  async HearingCentreAdmin2Login() {
    await this.exuiLogin(exuiUsers.hearingCenterAdminRegion2User);
  }

  async HearingCentreAdmin4Login() {
    await this.exuiLogin(exuiUsers.hearingCenterAdminRegion4User);
  }

  async TribunalCaseworkerRegion4Login() {
    await this.exuiLogin(exuiUsers.tribunalCaseworkerRegion4User);
  }

  async ExuiLogin(user: User) {
    await this.exuiLogin(user);
  }

  private async exuiLogin(user: User) {
    const { pageCookiesManager } = this.pageUtilsFactory;
    await pageCookiesManager.cookiesSignOut();
    if (!config.runSetup || this.isSetupTest || !CookiesHelper.cookiesExist(user)) {
      const { loginPage } = this.idamPageFactory;

      if (this.verifyCookiesBanner) {
        const { idamsCookiesBanner } = this.idamPageFactory;
        await loginPage.openManageCase();
        await idamsCookiesBanner.verifyContent();
        await idamsCookiesBanner.acceptCookies();
      } else {
        await pageCookiesManager.addIdamCookies();
        await this.setupUserData(user);
        await pageCookiesManager.addExuiCookies(user);
        await loginPage.openManageCase();
      }
      await loginPage.verifyContent();
      await loginPage.manageCaseLogin(user);
    } else {
      const cookies = await CookiesHelper.getCookies(user, this.isTeardownTest);
      await pageCookiesManager.cookiesLogin(user, cookies);
    }
  }
}
