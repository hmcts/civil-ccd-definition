import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { links } from './exui-nav-bar-content';

@AllMethodsStep()
export default class ExuiNavBar extends BasePage {
  async verifyContent(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async clickCreateCase() {
    await super.clickLink(links.createCase.title);
  }

  async clickSignOut() {
    await super.clickBySelector(links.signOut.selector);
    await super.expectDomain('idam-web-public');
  }
}
