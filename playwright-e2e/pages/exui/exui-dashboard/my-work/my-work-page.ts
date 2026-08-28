import urls from '../../../../config/urls';
import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import {heading} from './my-work-content';
import config from '../../../../config/config';

@AllMethodsStep()
export default class MyWorkPage extends BasePage {
  async verifyContent(): Promise<void> {
    await super.runVerifications([
      super.expectHeading(heading),
    ])
  }

  async openManageCase() {
    await super.retryGoTo(
      urls.manageCase,
      () =>
         super.expectUrlEnd('/work/my-work/list', { timeout: 6_000 }),
      undefined,
      { retries: 1 },
    );
  }

  async verifyUrl() {
    await super.expectUrlEnd('/work/my-work/list', { timeout: config.idam.pageSubmitTimeout });
  }

  async openCaseList() {
    await super.goTo(`${urls.manageCase}/cases`);
  }
}
