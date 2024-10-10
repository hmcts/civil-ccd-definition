import BasePage from '../../../base/base-page';
import { AllMethodsStep } from '../../../decorators/test-steps';
import { heading, links, subHeadings } from './create-account-content';

@AllMethodsStep()
export default class CreateAccountPage extends BasePage {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubHeading(subHeadings.createAccount),
      super.expectSubHeading(subHeadings.haveAccount),
    ]);
  }

  async clickSignIn() {
    await super.clickLink(links.signIn.title);
  }
}
