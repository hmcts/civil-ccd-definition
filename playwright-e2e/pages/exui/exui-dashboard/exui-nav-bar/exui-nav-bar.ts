import BasePage from '../../../../base/base-page';
import urls from '../../../../config/urls';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { links } from './exui-nav-bar-content';

@AllMethodsStep()
export default class ExuiNavBar extends BasePage {
  async verifyContent(): Promise<void> {
    super.runVerifications(
      [
        //super.expectLink(links.createCase.title), super.expectLink(links.caseList.title)
      ],
      { runAxe: false },
    );
  }

  async openCreateCaseWithUrl() {
    await super.goTo(`${urls.manageCase}/cases/case-filter`);
  }

  async clickCreateCase() {
    await super.clickLink(links.createCase.title);
  }

  async clickSignOut() {
    await super.clickBySelector(links.signOut.selector);
    // Accept both the legacy IDAM Web Public and the new HMCTS Access sign-in
    // domains during the migration transition (DTSCCI-5284 / DTSCCI-5285).
    await super.expectDomain('(idam-web-public|hmcts-access)');
  }
}
