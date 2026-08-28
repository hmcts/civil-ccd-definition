import urls from '../../../../config/urls';
import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import {heading} from './case-list-content'
import config from '../../../../config/config';

@AllMethodsStep()
export default class CaseListPage extends BasePage {
  async verifyContent(): Promise<void> {
    await super.runVerifications([
      super.expectHeading(heading),
    ])
  }

  async openManageCase() {
    await super.retryGoTo(
      urls.manageCase,
      () =>
        super.expectUrlEnd('/cases', { timeout: 6_000 }),
      undefined,
      { retries: 1 },
    );
  }

  async verifyUrl() {
    await super.expectUrlEnd('/cases', { timeout: config.idam.pageSubmitTimeout });
  }

  async openCaseList() {
    await super.goTo(`${urls.manageCase}/cases`);
  }
}
