import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { heading, radioButtons, radioButtons1v2 } from './fixed-recoverable-costs-content.ts';

@AllMethodsStep()
export default class FixedRecoverableCostsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(heading, { ignoreDuplicates: true }),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.yes.selector);
    await super.retryClickBySelector(radioButtons.yes.selector, () => Promise.resolve(), {
      retries: 2,
    });
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.no.selector);
  }

  async selectYes1v2() {
    await super.clickBySelector(radioButtons1v2.yes.selector);
  }

  async selectNo1v2() {
    await super.clickBySelector(radioButtons1v2.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
